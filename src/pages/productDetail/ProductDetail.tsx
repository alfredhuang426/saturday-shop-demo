import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Product } from "../../types/products.type";
import axios from "axios";
import styles from "./ProductDetail.module.scss";
import { Slider } from "../../components/slider/Slider";
import { NumberInputGroup } from "../../components/numberInputGroup/NumberInputGroup";

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
  const { getCart } = useOutletContext<{ getCart: () => void }>();
  const [isLoading, setIsLoading] = useState(false);

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

  const addToCart = async () => {
    try {
      setIsLoading(true);
      const addToCartResult = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        {
          data: {
            product_id: product?.id,
            qty: cartQuantity,
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
                      <NumberInputGroup quantity={cartQuantity} setQuantity={setCartQuantity} />
                    </div>
                    <div className="col-6 pe-0">
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
