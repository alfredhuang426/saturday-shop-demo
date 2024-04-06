import { useCallback, useEffect, useRef, useState } from "react";
import { Tab } from "bootstrap";
import { Banner } from "../../components/banner/Banner";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../types/products.type";
import { categoryConfig } from "../../configs/category-config";
import styles from "./Product.module.scss";

export const Products = () => {
  const tab = useRef<Tab | null>(null);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [classifiedProducts, setClassifiedProducts] = useState<
    Map<string, Product[]>
  >(new Map<string, Product[]>());

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const productsResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setClassifiedProducts(
        classifiedProductsProcess(productsResult.data.products as Product[])
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const classifiedProductsProcess = (
    products: Product[]
  ): Map<string, Product[]> => {
    const tempMap = new Map<string, Product[]>();
    tempMap.set("all", products);
    products.forEach((product) => {
      if (tempMap.has(product.category)) {
        (tempMap.get(product.category) as Product[]).push(product);
      } else {
        tempMap.set(product.category, [product]);
      }
    });
    return tempMap;
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const query = searchParams.get("category");
    if (query && classifiedProducts.get(query)) {
      tab.current = new Tab(`#${query}-tab`);
      tab.current?.show();
    }
  }, [classifiedProducts, searchParams]);

  return (
    <>
      <Banner />
      {isLoading && (
        <div className="d-flex justify-content-center my-auto">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="container mb-5">
          <ul
            className="nav nav-pills mb-3 justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            {Array.from(classifiedProducts).map((classifiedProduct, index) => {
              return (
                <li className="nav-item" role="presentation" key={index}>
                  <button
                    className={`nav-link ${index === 0 ? "active" : ""}`}
                    id={`${classifiedProduct?.[0]}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${classifiedProduct?.[0]}`}
                    type="button"
                    role="tab"
                    aria-controls={`#pills-${classifiedProduct?.[0]}`}
                    aria-selected={index === 0 ? true : false}
                  >
                    {categoryConfig?.[classifiedProduct?.[0]]}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="row mt-3">
            <div className="tab-content" id="pills-tabContent">
              {Array.from(classifiedProducts).map(
                (classifiedProduct, index) => {
                  return (
                    <div
                      key={index}
                      className={`tab-pane fade ${
                        index === 0 ? "active show" : ""
                      }`}
                      id={`pills-${classifiedProduct?.[0]}`}
                      role="tabpanel"
                      aria-labelledby={`pills-${classifiedProduct?.[0]}-tab`}
                    >
                      <div className="container">
                        <div className="row">
                          {classifiedProduct?.[1]?.map((product) => (
                            <div
                              className="col-sm-6 col-md-4 my-3"
                              key={product?.id}
                            >
                              <div className="card w-100 h-100">
                                <img
                                  src={product?.imageUrl}
                                  className={`card-img-top ${styles.img}`}
                                  alt={product?.title}
                                />
                                <div className="card-body d-flex flex-column align-items-center justify-content-start">
                                  <h4 className="mb-0 text-primary">
                                    {product?.title}
                                  </h4>
                                  <p className="card-text text-muted my-3">
                                    {product?.description}
                                  </p>
                                  <div className="mt-auto">
                                    <div className="mt-2 text-center d-sm-flex d-md-block d-lg-flex">
                                      <del className="text-muted me-sm-3 me-md-0 me-lg-3">
                                        <small>
                                          原價：NT ${product?.price}
                                        </small>
                                      </del>
                                      <p className="text-primary mb-0">
                                        售價：
                                        <strong>
                                          NT ${product?.origin_price}
                                        </strong>
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
                                        >
                                          加入購物車
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
