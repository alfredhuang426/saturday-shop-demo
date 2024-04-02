import { FaHamburger } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark bg-primary fixed-top ${styles["navbar-height"]}`}
    >
      <div
        className={`container-fluid align-items-center ${styles["navbar-interior-height"]}`}
      >
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <FaHamburger />
          <h1 className="h3 mb-0 px-2">Saturday's</h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title  d-flex align-items-center"
              id="offcanvasNavbarLabel"
            >
              <FaHamburger />
              <span className="px-2">Saturday's</span>
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body bg-primary">
            <ul className="navbar-nav justify-content-between flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/products"
                >
                  產品列表
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active fs-5" to="/cart">
                  購物車列表
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
