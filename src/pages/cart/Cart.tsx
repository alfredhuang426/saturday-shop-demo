import { useEffect, useState } from "react";
import { Stepbar } from "../../components/stepbar/Stepbar";
import { Product } from "../../types/products.type";
import axios from "axios";
import { Slider } from "../../components/slider/Slider";
import { CartTableRow } from "../../components/cartTableRow/CartTableRow";
import { Link, useOutletContext } from "react-router-dom";
import { Cart as CartType } from "../../types/cart.type";
import { CartItemCard } from "../../components/CartItem/CartItemCard";
import styles from "./Cart.module.scss";
import { Spinner } from "../../components/spinner/Spinner";

export const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAllProductsLoading, setIsAllProductsLoading] = useState(true);
  const [isCartDataLoading, setIsCartDataLoading] = useState(true);
  const { getCart, cartData } = useOutletContext<{
    getCart: () => void;
    cartData: CartType;
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
    (async () => {
      setIsCartDataLoading(true);
      await getCart();
      setIsCartDataLoading(false);
    })();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container pt-5">
        {isCartDataLoading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner />
          </div>
        )}
        {!isCartDataLoading && cartData.carts?.length === 0 && (
          <div className="text-center py-5 fs-3">
            購物車還沒有東西，快去逛逛
          </div>
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
                  總和:
                  <span className="fw-bold">NT${cartData?.final_total}</span>
                </div>
              </div>
              <div className="d-none d-md-block">
                <table className="table mt-3 mb-3">
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
                <Link to={`/profile`}>
                  <button
                    type="button"
                    className={`btn btn-outline-primary px-5 ${styles["custom-button"]}`}
                  >
                    下一步
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
        <Slider products={products} isLoading={isAllProductsLoading} />
      </div>
    </>
  );
};
