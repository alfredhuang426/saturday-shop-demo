import { useEffect, useRef, useState } from "react";
import { Tab } from "bootstrap";
import { Banner } from "../../components/banner/Banner";
import styles from "./Product.module.scss";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../../types/products.type";
import { categoryConfig } from "../../configs/category-config";

export const Products = () => {
  const tab = useRef<Tab | null>(null);
  const [searchParams] = useSearchParams();

  // const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [classifiedProducts, setClassifiedProducts] = useState<
    Map<string, Product[]>
  >(new Map<string, Product[]>());

  const getProducts = async () => {
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
  };

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
  }, []);
  useEffect(() => {
    const query = searchParams.get("category");
    if (query && classifiedProducts.get(query)) {
      tab.current = new Tab(`#${query}-tab`);
      tab.current?.show();
    }
  }, [classifiedProducts]);
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
                    aria-selected={`${index === 0 ? "true" : "false"}`}
                  >
                    {categoryConfig?.[classifiedProduct?.[0]]}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="row">
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
                      {classifiedProduct?.[0]}
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
