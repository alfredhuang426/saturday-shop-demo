import { FC } from "react";
import styles from "./Stepbar.module.scss";

type StepbarProps = {
  step?: number;
};

export const Stepbar: FC<StepbarProps> = ({ step = 1 }) => {
  return (
    <>
      <ol className={`${styles.steps}`}>
        <li className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
          <span className={`${styles["step-detail"]} text-center`}>
            確認商品
          </span>
        </li>
        <li className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
          <span className={`${styles["step-detail"]} text-center`}>
            填寫資料
          </span>
        </li>
        <li className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
          <span className={`${styles["step-detail"]} text-center`}>
            完成訂單
          </span>
        </li>
      </ol>
    </>
  );
};
