import styles from "./Banner.module.scss";

export const Banner = () => {
  return (
    <div className={`p-5 mb-5 ${styles["bg-img"]}`}>
      <div className="container">
        <h2 className="row text-white p-md-5 my-2 fw-bold">Food Haven</h2>
        <h3 className="row text-white px-md-5 pb-md-5 fs-5 fs-md-4">
          讓您的味蕾感受天堂級的美味
        </h3>
      </div>
    </div>
  );
};
