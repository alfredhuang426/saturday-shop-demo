import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cart } from "../../types/cart.type";

export const FrontLayouts = () => {
  const [cartData, setCartData] = useState<Cart>({
    carts: [],
    final_total: 0,
    total: 0,
  });

  const getCart = async () => {
    try {
      const getCartResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(getCartResult?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Navbar cartData={cartData} />
      <div
        style={{ marginTop: "62px", minHeight: "calc(100vh - 62px - 190px)" }}
      >
        <Outlet context={{ getCart, cartData }}></Outlet>
      </div>
      <Footer />
    </>
  );
};
