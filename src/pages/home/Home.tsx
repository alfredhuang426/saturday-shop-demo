import { useEffect, useState } from "react";
import { Banner } from "../../components/banner/Banner";
import { Introduction } from "../../components/introduction/Introduction";
import { More } from "../../components/more/More";
import { Slider } from "../../components/slider/Slider";
import { Product } from "../../types/products.type";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const productsResult = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setProducts(productsResult.data.products);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Banner />
      <Slider products={products} isLoading={isLoading} />
      <Introduction />
      <More products={products} isLoading={isLoading} />
    </>
  );
};
