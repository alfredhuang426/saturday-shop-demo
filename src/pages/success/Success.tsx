import { useEffect, useState } from "react";
import { Stepbar } from "../../components/stepbar/Stepbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Order } from "../../types/order.type";
import { OrderDetail } from "../../components/orderDetail/OrderDetail";

export const Success = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<Order>({});
  const [isLoading, setIsLoading] = useState(false);

  const getOrder = async (orderId: string = "") => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      setOrderData(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);
  return (
    <div className="container pt-5 my-5">
      <Stepbar step={3} />
      <div className="row mt-5">
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && (
          <>
            <OrderDetail orderData={orderData} />
          </>
        )}
      </div>
    </div>
  );
};
