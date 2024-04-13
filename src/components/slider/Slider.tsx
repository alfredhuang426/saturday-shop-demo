import { FC, useEffect, useState } from "react";
import { Product } from "../../types/products.type";
import styles from "./Slider.module.scss";
import { Link } from "react-router-dom";

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
        {!isLoading && (
          <div className={styles.slider}>
            <div className={`${styles.slides} d-md-flex`}>
              {shownProducts.map((product) => (
                <Link
                  to={`/product/${product?.id}`}
                  className="text-dark text-decoration-none"
                  key={product?.id}
                >
                  <div className={styles.slide}>
                    <img
                      className={styles.img}
                      src={product?.imageUrl}
                      alt={product?.title}
                    />
                    <div className="text-center">
                      <h4 className={`mb-1 mt-3 text-dark ${styles.h4}`}>
                        {product?.title}
                      </h4>
                      <p className="mb-0">
                        NT${product?.price}
                        <span className="text-muted px-2">
                          <del>NT${product?.origin_price}</del>
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
