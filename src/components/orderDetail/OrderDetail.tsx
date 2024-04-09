import { FaCopy } from "react-icons/fa";
import styles from "./OrderDetail.module.scss";
import { FC } from "react";
import { Order } from "../../types/order.type";

type OrderDetailProps = {
  orderData: Order | null;
};

export const OrderDetail: FC<OrderDetailProps> = ({ orderData }) => {
  return (
    <>
      <div className="col-md-7">
        <div className="bg-primary text-white text-center py-3">
          以下是您的訂購資訊，謝謝光臨。
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center">訂購時間</span>
          <span className={`w-50 ${styles["break-all"]}`}>
            {formatDate(
              orderData?.order?.create_at
                ? orderData?.order?.create_at * 1000
                : 0
            )}
          </span>
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center d-flex align-item-center justify-content-center">
            訂單編號
            <button
              type="button"
              className="btn border-0 py-0 px-1 text-primary"
              onClick={() => {
                navigator.clipboard.writeText(orderData?.order?.id || "");
              }}
            >
              <FaCopy />
            </button>
          </span>
          <span className={`w-50 ${styles["break-all"]}`}>
            {orderData?.order?.id}
          </span>
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center">訂購人</span>
          <span className={`w-50 ${styles["break-all"]}`}>
            {orderData?.order?.user?.name}
          </span>
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center">email</span>
          <span className={`w-50 ${styles["break-all"]}`}>
            {orderData?.order?.user?.email}
          </span>
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center">連絡電話</span>
          <span className={`w-50 ${styles["break-all"]}`}>
            {orderData?.order?.user?.tel}
          </span>
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center">地址</span>
          <span className={`w-50 ${styles["break-all"]}`}>
            {orderData?.order?.user?.address}
          </span>
        </div>
        <div className="d-flex py-3 border-bottom">
          <span className="px-3 w-50 text-center">其他需求</span>
          <pre className={`mb-0 w-50 ${styles.pre}`}>
            {orderData?.order?.message}
          </pre>
        </div>
      </div>
      <div className="col-md-5">
        <div className="border p-4 mb-4 mt-md-0 mt-5">
          <h4 className="mb-4">我的訂單</h4>
          {Object.values(orderData?.order?.products || {}).map((product) => (
            <div className="d-flex mb-3" key={product?.id}>
              <img
                src={product?.product?.imageUrl}
                alt={product?.product?.title}
                className={`${styles.img}`}
              />
              <div className="flex-fill ms-3">
                <div className="d-flex">
                  <h6 className="mb-0 font-weight-bold me-auto">
                    {product?.product?.title}
                  </h6>
                  <h6 className="mb-0 font-weight-bold">X {product?.qty}</h6>
                </div>
                <div className="d-flex">
                  <small className="mb-0 text-muted">
                    NT${product?.product?.price} / {product?.product?.unit}
                  </small>
                </div>
              </div>
            </div>
          ))}
          <hr></hr>
          <div className="d-flex justify-content-between">
            <span className="fw-bold fs-5">總金額</span>
            <span className="fw-bold fs-5">NT${orderData?.order?.total}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const formatDate = (milliseconds: number) => {
  const d = new Date(milliseconds);
  const year = d.getFullYear();
  const month = "" + (d.getMonth() + 1);
  const date = "" + d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();

  return `${year}/${month}/${date} ${hour}時${min}分${sec}秒`;
};
