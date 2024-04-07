import { useEffect, useState } from "react";
import { Stepbar } from "../../components/stepbar/Stepbar";
import { Product } from "../../types/products.type";
import axios from "axios";
import { Slider } from "../../components/slider/Slider";

export const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAllProductsLoading, setIsAllProductsLoading] = useState(true);
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
    getProducts();
  }, []);
  return (
    <>
      <div className="container pt-5">
        <Stepbar step={1} />
        <div className="container">
          <h3 className="border-start border-5 px-3 border-primary mt-5">
            購物車列表
          </h3>
          <table className="table mt-3 mb-5">
            <thead>
              <tr>
                <th scope="col" className="bg-primary text-white">
                  品項
                </th>
                <th scope="col" className="bg-primary text-white">
                  數量
                </th>
                <th scope="col" className="bg-primary text-white">
                  價格
                </th>
                <th scope="col" className="bg-primary text-white">
                  刪除
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1wefrgthyjukl,mhdfgbnmhrgdfgnmjtrdfgbn</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Slider products={products} isLoading={isAllProductsLoading} />
      </div>
    </>
  );
};
