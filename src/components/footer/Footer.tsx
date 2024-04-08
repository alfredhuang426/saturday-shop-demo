import {
  FaCopyright,
  FaFacebook,
  FaHamburger,
  FaInstagram,
  FaLine,
} from "react-icons/fa";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className={`bg-primary text-white py-3 ${styles.footer}`}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="d-flex align-items-center h3">
            <FaHamburger />
            <h1 className="h3 mb-0 px-2 text-white">Saturday's</h1>
          </span>
          <span className="d-flex">
            <Link className="h3 mb-0 px-2" to="/">
              <FaFacebook />
            </Link>
            <Link className="h3 mb-0 px-2" to="/">
              <FaLine />
            </Link>
            <Link className="h3 mb-0 px-2" to="/">
              <FaInstagram />
            </Link>
          </span>
        </div>
        <div className="d-md-flex justify-content-between align-items-center">
          <div className="mb-2">
            <p className="mb-0">服務專線：01-234-5678</p>
            <p className="mb-0">行動電話：0912-3456-7800</p>
            <p className="mb-0">電子郵件：saturday@gmail.com</p>
            <p className="mb-0">通訊地址：台南市東區大學路1號</p>
          </div>
          <div className="mb-2">
            <p className="mb-0">此網站僅為練習使用，無商業用途。</p>
            <p className="mb-0">
              <FaCopyright />
              <span className="mx-2">2024 LOGO All Rights Reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
