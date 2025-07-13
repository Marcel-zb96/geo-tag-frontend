import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { FormRow } from "./FromRow";

type FormInputProps = {
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  fieldError?: FieldError;
};

export const FormInput = ({ type, label, register, fieldError }: FormInputProps) => {
  return (
    <FormRow label={label} fieldError={fieldError}>
      <input type={type} id={label} step="any" className="h-14 w-full pl-2 bg-white text-black rounded-xl border-2 border-blue-500 drop-shadow-xl" {...register} />
    </FormRow>
  );
};
