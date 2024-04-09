import { UseFormRegister } from "react-hook-form";
import styles from "./Textarea.module.scss";
import { User } from "../../types/User.type";
import { FC } from "react";

type TextareaProps = {
  id: "message";
  placeholder: string;
  labelText: string;
  register: UseFormRegister<User>;
  rows: number;
};

export const Textarea: FC<TextareaProps> = ({
  id,
  labelText,
  placeholder,
  register,
  rows,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <textarea
        className={`form-control ${styles["resize-none"]}`}
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register(id)}
      />
    </>
  );
};
