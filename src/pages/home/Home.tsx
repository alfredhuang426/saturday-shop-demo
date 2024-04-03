import { Banner } from "../../components/banner/Banner";
import { Introduction } from "../../components/introduction/Introduction";
import { More } from "../../components/more/More";
import { Slider } from "../../components/slider/Slider";

export const Home = () => {
  return (
    <>
      <Banner />
      <Slider />
      <Introduction />
      <More />
    </>
  );
};
