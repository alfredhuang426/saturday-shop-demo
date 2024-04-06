import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/products.type";
import axios from "axios";
import styles from "./ProductDetail.module.scss";
import { Slider } from "../../components/slider/Slider";

export const ProductDetail = () => {
  const [product, setProduct] = useState<Product>({
    category: "",
    content: "",
    description: "",
    id: "",
    imageUrl: "",
    is_enabled: 0,
    origin_price: 0,
    price: 0,
    title: "",
    unit: "",
  });
  const [cartQuantity, setCartQuantity] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isAllProductLoading, setIsAllProductLoading] = useState(true);

  const { id } = useParams();

  const getProduct = async (id: string = "") => {
    setIsProductLoading(true);
    try {
      const productResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      setProduct(productResult.data.product);
    } catch (error) {
      console.log(error);
    }
    setIsProductLoading(false);
  };

  const getProducts = async () => {
    setIsAllProductLoading(true);
    try {
      const productsResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setProducts(productsResult.data.products);
    } catch (error) {
      console.log(error);
    }
    setIsAllProductLoading(false);
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container pt-5">
        <div className="row">
          {isProductLoading && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!isProductLoading && (
            <>
              <div className="col-md-7 mb-3">
                <img
                  src={product?.imageUrl}
                  className={`${styles.img}`}
                  alt={product?.title}
                />
              </div>
              <div className="col-md-5 mb-3 d-flex flex-column">
                <h2 className="fw-bold h1 mb-3">{product?.title}</h2>
                <pre className={`text-muted py-3 lh-lg ${styles.content}`}>
                  {product?.content}
                </pre>
                <p className="my-0 text-muted text-end">
                  <del>NT${product?.origin_price}</del>
                </p>
                <p className="h4 fw-bold text-end mb-0 mb-auto">
                  NT${product?.price}
                </p>
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="input-group">
                        <button
                          className={`btn btn-outline-primary px-3 fs-6 fw-bold ${styles["control-input-button"]}`}
                          type="button"
                          id="button-addon1"
                          onClick={() => {
                            setCartQuantity((pre) =>
                              pre === 1 ? pre : pre - 1
                            );
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className={`form-control border border-primary text-center ${styles["custom-input"]}`}
                          min={1}
                          value={cartQuantity}
                          onChange={(e) => {
                            setCartQuantity(+e.target.value);
                          }}
                        />
                        <button
                          className={`btn btn-outline-primary px-3 fs-6 fw-bold ${styles["control-input-button"]}`}
                          type="button"
                          id="button-addon2"
                          onClick={() => {
                            setCartQuantity((pre) => pre + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-6 pe-0">
                      <button
                        type="button"
                        className="btn btn-primary w-100 h-100 text-white"
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row mt-5">
          <Slider products={products} isLoading={isAllProductLoading} />
        </div>
      </div>
    </>
  );
};
