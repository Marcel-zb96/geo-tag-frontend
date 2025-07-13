import { exportNotesToGeoJson } from "../../exporter/geojsonExporter";
import type { NoteDTO, NoteExportDTO, SaveNoteDTO, UserDTO } from "../../types/form";
import NoteCard from "./NoteCard";
import { getUser } from "../../query/query";
import { useQuery } from "@tanstack/react-query";


interface NoteBarPorps {
    notes: NoteDTO[] | undefined;
    isLoading: boolean;
    onclick: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (note: NoteDTO) => void;
    handleImportClick: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

const NoteBar = ({ notes, isLoading, onclick, onDelete, onUpdate, handleImportClick, fileInputRef, handleFileChange }: NoteBarPorps) => {
    
    const { data: user, isLoading: userLoading } = useQuery<UserDTO>({
        queryKey: ["currentUser"],
        queryFn: getUser,
    });
    
    const handleExportNotes = () => {
        if (!notes || notes.length === 0) {
            alert("No notes to export.");
            return;
        }

        try {
            const parsedNotes: NoteExportDTO[] = notes.map((note) => {
                return {
                    title: note.title,
                    content: note.content,
                    latitude: note.latitude,
                    longitude: note.longitude,
                    owner: {
                        userName: user?.userName ?? "",
                        email: user?.email ?? "",
                        id: user?.id ?? "",
                    }
                }
            });
            const geojson = exportNotesToGeoJson(parsedNotes);
            const blob = new Blob([geojson], { type: "application/geo+json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "notes.geojson";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            alert("Failed to export notes.");
        }
    };

    

    if (isLoading || userLoading) return (
        <div className="flex flex-col pt-5 pb-5 text-3xl font-bold w-full h-full justify-center items-center">
            Loading...
        </div>
    )

    return <>
        <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full">
                <div className=" flex flex-col pt-5 pb-5 text-3xl font-stretch-140% font-bold border-2 rounded-2xl w-full h-30 bg-blue-500 text-white justify-center items-center">
                    <div>Notes</div>
                </div>
                <div className="flex flex-col items-center w-full">
                    {
                        notes!.map((note) => {
                            return (
                                <NoteCard key={note.id} note={note} handleClick={onclick} onDelete={onDelete} onUpdate={onUpdate} />
                            )
                        })
                    }
                </div >
            </div>
            <div className="flex flex-row gap-2 justify-center items-center mb-10 ">
                <div onClick={handleExportNotes} className="flex justify-center items-center border-2 rounded-2xl w-full bg-blue-950 text-white h-15 hover:bg-white hover:text-black" >Export notes</div>
                {
                    localStorage.getItem("GeoNotesAccessLevel") === "ADMIN" &&
                        <>
                            <div className="flex justify-center items-center border-2 w-full rounded-2xl bg-blue-950 text-white h-15 hover:bg-white hover:text-black" onClick={handleImportClick}>Import notes</div><input
                                type="file"
                                accept=".geojson,application/geo+json,application/json"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange} />
                        </>
                }
            </div>
        </div>
    </>
}

export default NoteBar;