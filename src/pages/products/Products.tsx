import { useEffect, useRef } from "react";
import { Tab } from "bootstrap";
import { Banner } from "../../components/banner/Banner";
import styles from "./Product.module.scss";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const tab = useRef<Tab | null>(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const query = searchParams.get("category");
    console.log(query);
    tab.current = new Tab("#pills-profile-tab");
    setTimeout(() => {
      tab.current?.show();
    }, 2000);
  }, []);
  return (
    <>
      <Banner />
      <div className="container mb-5">
        <ul
          className="nav nav-pills mb-3 justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact1-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact1"
              type="button"
              role="tab"
              aria-controls="pills-contact1"
              aria-selected="false"
            >
              Contact1
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact2-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact2"
              type="button"
              role="tab"
              aria-controls="pills-contact2"
              aria-selected="false"
            >
              Contact2
            </button>
          </li>
        </ul>
        <div className="row">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              home
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              profile
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              contact
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact1"
              role="tabpanel"
              aria-labelledby="pills-contact1-tab"
            >
              contact1
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact2"
              role="tabpanel"
              aria-labelledby="pills-contact2-tab"
            >
              contact2
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
