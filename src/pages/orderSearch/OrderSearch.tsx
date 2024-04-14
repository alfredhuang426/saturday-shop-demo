import React, { useState } from "react";
import { OrderDetail } from "../../components/orderDetail/OrderDetail";
import { Order } from "../../types/order.type";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Spinner } from "../../components/spinner/Spinner";

export const OrderSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [orderData, setOrderData] = useState<Order | null>(null);

  const getOrder = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${searchParam}`
      );
      setOrderData(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="text-primary fs-4 mb-2">訂單查詢</div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control border border-primary"
                placeholder="請輸入訂單編號"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    getOrder();
                  }
                }}
                onChange={(e) => {
                  setSearchParam(e.target.value);
                }}
              />
              <button
                className="btn btn-primary px-4 text-white"
                type="button"
                id="button-addon2"
                disabled={!searchParam}
                onClick={getOrder}
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner />
          </div>
        )}
        {!isLoading && orderData && (
          <>
            <div className="row mt-5">
              <OrderDetail orderData={orderData} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
