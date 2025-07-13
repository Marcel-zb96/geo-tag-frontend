import { useForm } from "react-hook-form";
import type { NoteDTO, UpdateNoteDTO } from "../../types/form";
import { FormInput } from "./FormInput";
import FormTextArea from "./FromTextArea";
import { useEffect } from "react";

interface UpdateNoteFromProp {
    note: NoteDTO;
    updatePos: [number, number] | null;
    setUpdatePos: (pos: [number, number]) => void;
    onUpdate: (noteId: string, data: UpdateNoteDTO) => void;
}
const UpdateNoteForm = ({ note, updatePos, setUpdatePos, onUpdate }: UpdateNoteFromProp) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateNoteDTO>({
        defaultValues: {
            title: note.title,
            content: note.content,
            latitude: note.latitude,
            longitude: note.longitude,
        },
    });

    // Sync form fields with updatePos
    useEffect(() => {
        if (updatePos) {
            setValue('latitude', updatePos[0]);
            setValue('longitude', updatePos[1]);
        }
    }, [updatePos, setValue]);

    // When form fields change, update updatePos
    const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lat = parseFloat(e.target.value);
        if (!isNaN(lat) && updatePos) setUpdatePos([lat, updatePos[1]]);
    };
    const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lng = parseFloat(e.target.value);
        if (!isNaN(lng) && updatePos) setUpdatePos([updatePos[0], lng]);
    };

    return (
        <div className="h-full">
            <div className=" flex flex-col pt-5 pb-5 text-3xl font-bold border-2 rounded-2xl w-full items-center">
                <div>Update Note</div>
            </div>
            <form
                className="w-full h-full mt-5 flex flex-col justify-start items-start"
                onSubmit={handleSubmit((data) => onUpdate(note.id, data))}
            >
                <div className="flex flex-col items-center">
                    <div className="text-3xl mt-5">
                        Title:
                    </div>
                    <FormInput
                        type="text"
                        label=""
                        register={register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">
                            {errors.title.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-center mt-10">
                    <div className="text-3xl">
                        Content:
                    </div>
                    <FormTextArea
                        label=""
                        register={register("content", { required: "Content is required" })} />
                    {errors.title && (
                        <span className="text-red-500 text-sm">
                            {errors.content?.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-3xl mt-10">Longitude:</div>
                    <FormInput
                        type="number"
                        label=""
                        register={register("longitude", { required: "Longitude is required", onChange: handleLngChange })}
                    />
                    {errors.longitude && (
                        <span className="text-red-500 text-sm">
                            {errors.longitude?.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-3xl mt-10">Latitude:</div>
                    <FormInput
                        type="number"
                        label=""
                        register={register("latitude", { required: "Latitude is required", onChange: handleLatChange })}
                    />
                </div>
                <button className="mt-10 border-3 font-bold rounded-md pr-5 pl-5 pt-2 pb-2 border-blue-300 bg-blue-500 self-center font-stretch-120% text-black hover:bg-white hover:text-black">
                    Save
                </button>
            </form>
        </div>
    );
}

export default UpdateNoteForm;