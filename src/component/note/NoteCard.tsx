import { useForm } from "react-hook-form";
import type { NoteDTO } from "../../types/form";

interface NoteCardProp {
    note: NoteDTO;
    handleClick: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (note: NoteDTO) => void;
}

const NoteCard = ({ note, handleClick, onDelete, onUpdate }: NoteCardProp) => {
    const { handleSubmit: handleDelete, register: registerDelete } = useForm();
    const { handleSubmit: handleUpdate, register: registerUpdate } = useForm();

    return (
        <div className=" flex flex-row w-full border-2 rounded-xl h-20 items-center justify-between pr-10 pl-10 hover:bg-blue-400/50" onClick={() => handleClick(note.id)}>
            <div>
                {note.title}
            </div>
            <div className="flex flex-col justify-center items-center">
                <form onSubmit={handleDelete(() => onDelete(note.id))}>
                    <button className="bg-red-400 text-white rounded-2xl border-2 pl-2 pr-2 pt-1 pb-1 hover:bg-white hover:text-red-500" type="submit" {...registerDelete("delete")}>Delete</button>
                </form>
                <form onSubmit={handleUpdate(() => onUpdate(note))}>
                    <button className="bg-green-500 text-white rounded-2xl border-2 pl-2 pr-2 pt-1 pb-1 hover:bg-white hover:text-green-500" type="submit" {...registerUpdate("update")}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default NoteCard;