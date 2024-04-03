import styles from "./Introduction.module.scss";

export const Introduction = () => {
  return (
    <div className={`${styles["parallax-scrolling-section"]} mb-5`}>
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-md-6 text-center text-light">
            <h3>Thanl God it's Saturday</h3>
            <p className="mt-5">
              由新鮮食材和傳統配方製作而成，每一口都彷彿置身於意大利的小鎮中
              <br />
              <br />
              "我們的披薩以經典配料和特色口味為特色，配合酥脆可口的薄餅底，我們的義大利麵也是精心製作而成，從簡單的番茄醬義大利麵到奢華的海鮮義大利麵，滿足各種口味需求。"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
