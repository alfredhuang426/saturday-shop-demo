import { FC, useEffect, useState } from "react";
import { Stepbar } from "../../components/stepbar/Stepbar";
import { Product } from "../../types/products.type";
import axios from "axios";
import { Slider } from "../../components/slider/Slider";
import { CartTableRow } from "../../components/cartTableRow/CartTableRow";
import { useOutletContext } from "react-router-dom";
import { Cart as CartType } from "../../types/cart.type";
import { CartItemCard } from "../../components/CartItem/CartItemCard";
import styles from "./Cart.module.scss";

export const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAllProductsLoading, setIsAllProductsLoading] = useState(true);
  const { getCart, cartData, isCartDataLoading } = useOutletContext<{
    getCart: () => void;
    cartData: CartType;
    isCartDataLoading: boolean;
  }>();

  const getProducts = async () => {
    setIsAllProductsLoading(true);
    try {
      const productsResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setProducts(productsResult.data.products);
    } catch (error) {
      console.log(error);
    }
    setIsAllProductsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container pt-5">
        {isCartDataLoading && (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isCartDataLoading && cartData.carts?.length === 0 && (
          <div className="text-center py-5 fs-3">購物車為空，再去逛逛</div>
        )}
        {!isCartDataLoading && cartData.carts?.length > 0 && (
          <>
            <Stepbar step={1} />
            <div className="container">
              <h3 className="border-start border-5 px-3 border-primary mt-5">
                購物車列表
              </h3>
              <div className="d-md-none">
                {cartData.carts.map((cart, index) => {
                  return (
                    <CartItemCard
                      cartItem={cart}
                      key={index}
                      getCart={getCart}
                    />
                  );
                })}
                <div className="fs-5 mb-3 text-end pe-4">
                  總和:{" "}
                  <span className="fw-bold">NT${cartData?.final_total}</span>
                </div>
              </div>
              <div className="d-none d-md-block">
                <table className="table mt-3 mb-3 d-none d-md-block">
                  <thead>
                    <tr>
                      <th scope="col" className="bg-primary text-white">
                        品項
                      </th>
                      <th
                        scope="col"
                        className="bg-primary text-white text-center"
                      >
                        數量
                      </th>
                      <th
                        scope="col"
                        className="bg-primary text-white text-center"
                      >
                        價格
                      </th>
                      <th
                        scope="col"
                        className="bg-primary text-white text-center"
                      >
                        刪除
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.carts.map((cart, index) => {
                      return (
                        <CartTableRow
                          cartItem={cart}
                          key={index}
                          getCart={getCart}
                        />
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="text-end fs-5 py-3">
                        總和
                      </td>
                      <td className="text-center fs-5 fw-bold">
                        NT${cartData?.final_total}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="text-end mb-5 pe-4">
                <button
                  type="button"
                  className={`btn btn-outline-primary px-5 ${styles["custom-button"]}`}
                >
                  下一步
                </button>
              </div>
            </div>
          </>
        )}
        <Slider products={products} isLoading={isAllProductsLoading} />
      </div>
    </>
  );
};
