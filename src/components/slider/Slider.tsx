import { FC, useEffect, useState } from "react";
import { Product } from "../../types/products.type";
import styles from "./Slider.module.scss";
import { NavLink } from "react-router-dom";

type SliderProps = {
  products?: Product[];
  isLoading?: boolean;
};

export const Slider: FC<SliderProps> = ({
  products = [],
  isLoading = false,
}) => {
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  useEffect(() => {
    setShownProducts(products.slice(-6));
  }, [products]);

  return (
    <>
      <div className="container mb-5">
        <h3 className="border-start border-5 px-3 border-primary">熱門商品</h3>
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className={styles.slider}>
          <div className={`${styles.slides} d-md-flex`}>
            {shownProducts.map((product) => (
              <div className={styles.slide} key={product?.id}>
                <img
                  className={styles.img}
                  src={product?.imageUrl}
                  alt={product?.title}
                />
                <div className="text-center">
                  <h4 className={`mb-1 mt-3 text-dark ${styles.h4}`}>
                    <NavLink className="text-dark text-decoration-none" to="/">
                      {product?.title}
                    </NavLink>
                  </h4>
                  <p className="mb-0">
                    NT${product?.price}
                    <span className="text-muted px-2">
                      <del>NT${product?.origin_price}</del>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
