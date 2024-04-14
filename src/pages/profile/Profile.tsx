import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Stepbar } from "../../components/stepbar/Stepbar";
import styles from "./Profile.module.scss";
import { Cart } from "../../types/cart.type";
import { useForm } from "react-hook-form";
import { User } from "../../types/User.type";
import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/textarea/Textarea";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";

export const Profile = () => {
  const { cartData, isCartDataLoading, getCart } = useOutletContext<{
    cartData: Cart;
    isCartDataLoading: boolean;
    getCart: () => void;
  }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: User) => {
    const { name, email, tel, address, message } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
        message: message,
      },
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      navigate(`/success/${res.data.orderId}`);
      setIsLoading(false);
      getCart();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container pt-5">
      <Stepbar step={2} />
      <div className="row mt-5 flex-md-row-reverse">
        <div className="col-md-5">
          {isCartDataLoading && (
            <div className="d-flex justify-content-center mt-5">
              <Spinner />
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
                <Input
                  labelText="電子郵件"
                  type="email"
                  id="email"
                  placeholder="請輸入電子郵件"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "Email為必填",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email格式不正確",
                    },
                  }}
                />
              </div>
              <div className="form-group my-3">
                <Input
                  labelText="訂購人姓名"
                  type="text"
                  id="name"
                  placeholder="請輸入訂購人姓名"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "訂購人姓名為必填",
                  }}
                />
              </div>
              <div className="form-group my-3">
                <Input
                  labelText="電話"
                  type="tel"
                  id="tel"
                  placeholder="請輸入電話"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "電話為必填",
                    minLength: {
                      value: 6,
                      message: "電話不少於 6 碼",
                    },
                    maxLength: {
                      value: 12,
                      message: "電話不超過 12 碼",
                    },
                  }}
                />
              </div>
              <div className="form-group my-3">
                <Input
                  labelText="地址"
                  type="text"
                  id="address"
                  placeholder="請輸入地址"
                  errors={errors}
                  register={register}
                  rules={{
                    required: "地址為必填",
                  }}
                />
              </div>
              <div className="form-group my-3">
                <Textarea
                  labelText="其他需求"
                  id="message"
                  placeholder="如果有其他需求，請留言告知我們"
                  register={register}
                  rows={5}
                />
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
                  disabled={isLoading}
                >
                  {isLoading && <Spinner small />}
                  {!isLoading && "下一步"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
