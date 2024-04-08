import { FC, useState } from "react";
import { Product } from "../../types/products.type";
import styles from "./ProductItem.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";

type ProductItemrProps = {
  product: Product;
  getCart: () => void;
};

export const ProductItem: FC<ProductItemrProps> = ({ product, getCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const addToCart = async () => {
    try {
      setIsLoading(true);
      const addToCartResult = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        {
          data: {
            product_id: product?.id,
            qty: 1,
          },
        }
      );
      setIsLoading(false);
      getCart();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="col-sm-6 col-md-4 my-3" key={product?.id}>
      <div className="card w-100 h-100">
        <img
          src={product?.imageUrl}
          className={`card-img-top ${styles.img}`}
          alt={product?.title}
        />
        <div className="card-body d-flex flex-column align-items-center justify-content-start">
          <h4 className="mb-0 text-primary">{product?.title}</h4>
          <p className="card-text text-muted my-3">{product?.description}</p>
          <div className="mt-auto">
            <div className="mt-2 text-center d-sm-flex d-md-block d-lg-flex">
              <del className="text-muted me-sm-3 me-md-0 me-lg-3">
                <small>原價： NT ${product?.origin_price}</small>
              </del>
              <p className="text-primary mb-0">
                售價：
                <strong>NT ${product?.price}</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-around py-3">
          <div className="container px-0">
            <div className="row gx-2">
              <div className="col-6">
                <Link to={`/product/${product?.id}`}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 h-100"
                  >
                    查看更多
                  </button>
                </Link>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-primary w-100 h-100 text-white"
                  onClick={addToCart}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <div
                      className="spinner-border text-white spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {!isLoading && "加入購物車"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
