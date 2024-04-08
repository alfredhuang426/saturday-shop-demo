import { Link, useOutletContext } from "react-router-dom";
import { Stepbar } from "../../components/stepbar/Stepbar";
import styles from "./Profile.module.scss";
import { Cart } from "../../types/cart.type";
import { useForm } from "react-hook-form";
import { Form } from "../../types/form.type";
import { Input } from "../../components/input/Input";

export const Profile = () => {
  const { cartData, isCartDataLoading } = useOutletContext<{
    cartData: Cart;
    isCartDataLoading: boolean;
  }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    console.log(data);
  };

  return (
    <div className="container pt-5">
      <Stepbar step={2} />
      <div className="row mt-5 flex-md-row-reverse">
        <div className="col-md-5">
          {isCartDataLoading && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!isCartDataLoading && (
            <div className="border p-4 mb-4 mt-md-0 mt-5">
              <h4 className="mb-4">我的訂單</h4>
              {cartData?.carts.map((cart) => (
                <div className="d-flex mb-3" key={cart?.id}>
                  <img
                    src={cart?.product?.imageUrl}
                    alt={cart?.product?.title}
                    className={`${styles.img}`}
                  />
                  <div className="flex-fill ms-3">
                    <div className="d-flex">
                      <h6 className="mb-0 font-weight-bold me-auto">
                        {cart?.product?.title}
                      </h6>
                      <h6 className="mb-0 font-weight-bold">X {cart?.qty}</h6>
                    </div>
                    <div className="d-flex">
                      <small className="mb-0 text-muted">
                        NT${cart?.product?.price} / {cart?.product?.unit}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              <hr></hr>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-5">總金額</span>
                <span className="fw-bold fs-5">NT${cartData?.final_total}</span>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-7">
          <div className="mb-3">
            <h4 className="text-dark font-weight-bold mb-0 mt-4 mt-md-0">
              訂購人資訊
            </h4>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-group my-3">
                <label htmlFor="email" className="form-label">
                  <span className="text-danger">*</span>
                  電子郵件
                </label>
                <Input
                  labelText="電子郵件"
                  type="email"
                  id="email"
                  placeholder="請輸入電子郵件"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "Email 為必填",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email 格式不正確",
                    },
                  }}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="name" className="form-label">
                  <span className="text-danger">*</span>
                  訂購人姓名
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="請輸入訂購人姓名"
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="tel" className="form-label">
                  <span className="text-danger">*</span>
                  電話
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  placeholder="請輸入電話"
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="address" className="form-label">
                  <span className="text-danger">*</span>
                  地址
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="請輸入地址"
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="message" className="form-label">
                  其他需求
                </label>
                <textarea
                  className={`form-control ${styles["resize-none"]}`}
                  id="message"
                  rows={5}
                  placeholder="如果有其他需求，請留言告知我們"
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <Link to={`/cart`}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-5"
                  >
                    上一步
                  </button>
                </Link>
                <button
                  type="submit"
                  className={`btn btn-outline-primary px-5 ${styles["custom-button"]}`}
                >
                  下一步
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
