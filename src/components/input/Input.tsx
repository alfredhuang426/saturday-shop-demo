import { FC } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Form } from "../../types/form.type";

type InputProps = {
  id: "name" | "email" | "tel" | "address" | "message";
  placeholder: string;
  labelText: string;
  register: UseFormRegister<Form>;
  type: string;
  errors: FieldErrors<Form>;
  rules?: RegisterOptions<Form>;
};

export const Input: FC<InputProps> = ({
  id,
  labelText,
  placeholder,
  register,
  type,
  errors,
  rules,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`form-control ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};
