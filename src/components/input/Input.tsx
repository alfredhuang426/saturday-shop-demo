import { FC } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { User } from "../../types/User.type";

type InputProps = {
  id: "name" | "email" | "tel" | "address";
  placeholder: string;
  labelText: string;
  register: UseFormRegister<User>;
  type: string;
  errors: FieldErrors<User>;
  rules?: RegisterOptions<User>;
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
