import type { NoteDTO } from "../../types/form";
import NoteCard from "./NoteCard";


interface NoteBarPorps {
    notes: NoteDTO[] | undefined;
    isLoading: boolean;
    onclick:  (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (note: NoteDTO) => void;
}

const NoteBar = ({ notes, isLoading, onclick, onDelete, onUpdate}: NoteBarPorps) => {

    if (isLoading) return (
        <div className="flex flex-col pt-5 pb-5 text-3xl font-bold w-full h-full justify-center items-center">
            Loading...
        </div>
    )

    return <>
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
    </>
}

export default NoteBar;