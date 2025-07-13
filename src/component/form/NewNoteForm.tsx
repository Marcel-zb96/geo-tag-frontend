import { useForm, type SubmitHandler } from "react-hook-form";
import type { SaveNoteDTO } from "../../types/form";
import { FormInput } from "./FormInput";
import FormTextArea from "./FromTextArea";


interface NewNoteFormProp {
    clickedPos: [number, number];
    onSubmit: SubmitHandler<SaveNoteDTO>;
}

const NewNoteForm = ({ clickedPos, onSubmit }: NewNoteFormProp) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SaveNoteDTO>({
        defaultValues: {
            title: "",
            content: "",
            latitude: clickedPos[0],
            longitude: clickedPos[1],
        },
    });

    return (
        <div className="h-full">
            <div className=" flex flex-col pt-5 pb-5 text-3xl font-bold border-2 rounded-2xl w-full items-center">
                <div>New Note</div>
            </div>
            <form
                className="w-full h-full mt-5 flex flex-col justify-start items-start"
                onSubmit={handleSubmit(onSubmit)}
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
                    <div className="text-3xl mt-10">
                        Longitude:
                    </div>
                    <FormInput
                        type="number"
                        label=""
                        register={register("longitude", { required: "Longitude is required" })}
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">
                            {errors.longitude?.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-3xl mt-10">
                        Latitude:
                    </div>
                    <FormInput
                        type="number"
                        label=""
                        register={register("latitude", { required: "Latitude is required" })}
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">
                            {errors.latitude?.message}
                        </span>
                    )}
                </div>

                <button className="mt-10 border-3 font-bold rounded-md pr-5 pl-5 pt-2 pb-2 border-blue-300 bg-blue-500 self-center font-stretch-120% text-black hover:bg-white hover:text-black">
                    Save
                </button>
            </form>
        </div>
    )
}

export default NewNoteForm;