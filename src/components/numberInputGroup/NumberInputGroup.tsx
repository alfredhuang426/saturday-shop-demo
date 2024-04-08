import { Dispatch, FC, MutableRefObject, SetStateAction } from "react";
import styles from "./NumberInputGroup.module.scss";

type NumberInputGroupProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  isReadOnly?: boolean;
  isButtonClicked?: MutableRefObject<boolean>;
};

export const NumberInputGroup: FC<NumberInputGroupProps> = ({
  quantity = 1,
  setQuantity,
  isReadOnly = false,
  isButtonClicked = null,
}) => {
  return (
    <div className="input-group">
      <button
        className={`btn btn-outline-primary px-3 fs-6 fw-bold ${styles["control-input-button"]}`}
        type="button"
        id="button-addon1"
        disabled={quantity <= 1}
        onClick={() => {
          if (isButtonClicked) {
            isButtonClicked.current = true;
          }
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
        readOnly={isReadOnly}
        onChange={(e) => {
          setQuantity(+e.target.value);
        }}
      />
      <button
        className={`btn btn-outline-primary px-3 fs-6 fw-bold ${styles["control-input-button"]}`}
        type="button"
        id="button-addon2"
        onClick={() => {
          if (isButtonClicked) {
            isButtonClicked.current = true;
          }
          setQuantity((pre) => pre + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
