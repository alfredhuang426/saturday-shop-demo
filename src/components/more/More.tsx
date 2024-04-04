import { NavLink } from "react-router-dom";
import styles from "./More.module.scss";
import { Product } from "../../types/products.type";
import { FC, useEffect, useState } from "react";

type SliderProps = {
  products?: Product[];
  isLoading?: boolean;
};

export const More: FC<SliderProps> = ({ products = [], isLoading = false }) => {
  const [isClassifiedCompleted, setIsClassifiedCompleted] =
    useState<boolean>(false);
  const [classifiedProducts, setClassifiedProducts] = useState<
    Map<string, Product[]>
  >(new Map<string, Product[]>());

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      setIsClassifiedCompleted(false);
      try {
        const tempMap = new Map<string, Product[]>();
        products.forEach((product) => {
          if (tempMap.has(product.category)) {
            (tempMap.get(product.category) as Product[]).push(product);
          } else {
            tempMap.set(product.category, [product]);
          }
        });
        setClassifiedProducts(tempMap);
      } catch (error) {
        console.error(error);
      }
    }
    setIsClassifiedCompleted(true);
  }, [products, isLoading]);
  return (
    <div className="container my-5">
      {(isLoading || !isClassifiedCompleted) && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row">
        {Array.from(classifiedProducts).map((classifiedProduct) => {
          return (
            <div className="col-md-6 mb-5" key={classifiedProduct?.[0]}>
              <h3 className="border-start border-bottom border-5 px-2 py-1 border-primary">
                {classifiedProduct?.[0]}系列
              </h3>
              <div className="row">
                <div className="col-md-7">
                  <img
                    alt="burger"
                    className={`w-100 ${styles.img}`}
                    src={classifiedProduct?.[1]?.[0]?.imageUrl}
                  />
                </div>
                <div className="col-md-5">
                  <div className="d-flex justify-content-center flex-column h-100">
                    <ul className="mb-auto">
                      {classifiedProduct?.[1].map((product) => {
                        return (
                          <li className="my-1" key={product.id}>
                            {product.title}
                          </li>
                        );
                      })}
                    </ul>
                    <div>
                      <NavLink
                        to={`/products?category=${classifiedProduct?.[0]}`}
                        className="btn btn-primary w-100 text-white"
                      >
                        前往選購
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
