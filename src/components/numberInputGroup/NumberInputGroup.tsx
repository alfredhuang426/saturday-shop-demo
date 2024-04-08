import { Dispatch, FC, SetStateAction } from "react";
import styles from "./NumberInputGroup.module.scss";

type NumberInputGroupProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export const NumberInputGroup: FC<NumberInputGroupProps> = ({
  quantity = 1,
  setQuantity,
}) => {
  return (
    <div className="input-group">
      <button
        className={`btn btn-outline-primary px-3 fs-6 fw-bold ${styles["control-input-button"]}`}
        type="button"
        id="button-addon1"
        onClick={() => {
          setQuantity((pre) => (pre === 1 ? pre : pre - 1));
        }}
      >
        -
      </button>
      <input
        type="number"
        className={`form-control border border-primary text-center ${styles["custom-input"]}`}
        min={1}
        value={quantity}
        onChange={(e) => {
          setQuantity(+e.target.value);
        }}
      />
      <button
        className={`btn btn-outline-primary px-3 fs-6 fw-bold ${styles["control-input-button"]}`}
        type="button"
        id="button-addon2"
        onClick={() => {
          setQuantity((pre) => pre + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
