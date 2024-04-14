import { FC } from "react";

type SpinnerProps = {
  small?: boolean;
  color?: string;
};

export const Spinner: FC<SpinnerProps> = ({
  small = false,
  color = "primary",
}) => {
  return (
    <div
      className={`spinner-border text-${color} ${
        small ? "spinner-border-sm" : ""
      }`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
