import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../types/products.type";
import styles from "./Slider.module.scss";
import { NavLink } from "react-router-dom";

export const Slider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const productsResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      console.log(productsResult.data.products.slice(-6));
      setProducts(productsResult.data.products.slice(-6));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container mb-5">
        <h3 className="border-start border-5 px-3 border-primary">熱門商品</h3>
        <div className={styles.slider}>
          <div className={`${styles.slides} d-md-flex`}>
            {products.map((product) => (
              <div className={styles.slide}>
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
            {/* <div className={styles.slide}>
              <img
                className={styles.img}
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1489"
                alt="XD 1"
              />
            </div>
            <div className={styles.slide}>
              <img
                className={styles.img}
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1489"
                alt="XD 1"
              />
            </div>
            <div className={styles.slide}>
              <img
                className={styles.img}
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1489"
                alt="XD 1"
              />
            </div>
            <div className={styles.slide}>
              <img
                className={styles.img}
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1489"
                alt="XD 1"
              />
            </div>
            <div className={styles.slide}>
              <img
                className={styles.img}
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1489"
                alt="XD 1"
              />
            </div>
            <div className={styles.slide}>
              <img
                className={styles.img}
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1489"
                alt="XD 1"
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
