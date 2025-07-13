import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { FormRow } from "./FromRow";

type FormTextAreaProps = {
  label: string;
  register: UseFormRegisterReturn;
  fieldError?: FieldError;
};

const FormTextArea = ({ label, register, fieldError }: FormTextAreaProps) => {
  return (
    <FormRow label={label} fieldError={fieldError}>
      <textarea id={label} className="h-24 w-full pl-2 bg-white text-black rounded-xl border-2 border-blue-500 drop-shadow-xl" {...register} />
    </FormRow>
  );
};

export default FormTextArea;