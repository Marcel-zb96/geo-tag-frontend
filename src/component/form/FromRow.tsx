import type { ReactNode } from "react";
import { FormError } from "../error/FormError";
import { type FieldError } from "react-hook-form";

type FormRowProps = {
  children: ReactNode;
  fieldError?: FieldError;
  label: string;
};

export const FormRow = ({ children, fieldError, label }: FormRowProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-black text-center mt-5">
        {label}
      </label>
      {children}
      <FormError fieldError={fieldError} />
    </div>
  );
};
