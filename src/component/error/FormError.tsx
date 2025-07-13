import { type FieldError } from "react-hook-form";

type FormErrorProps = {
  fieldError?: FieldError;
};

export const FormError = ({ fieldError }: FormErrorProps) => {
  return (
    fieldError && (
      <span className="text-white p-2 text-[20px] mt-2 font-bold rounded-2xl bg-red-900">{fieldError.message}</span>
    )
  );
};
