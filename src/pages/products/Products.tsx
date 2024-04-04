import { useEffect, useRef } from "react";
import { Tab } from "bootstrap";
import { Banner } from "../../components/banner/Banner";
import styles from "./Product.module.scss";

export const Products = () => {
  const tab = useRef<Tab | null>(null);
  useEffect(() => {
    tab.current = new Tab("#list-profile-list");
    setTimeout(() => {
      tab.current?.show();
    }, 2000);
  }, []);
  return (
    <>
      <Banner />
      <div className="container mb-5">
        <div className="row">
          <div>
            <div
              className="list-group list-group-horizontal"
              id="list-tab"
              role="tablist"
            >
              <a
                className="list-group-item list-group-item-action text-center active"
                id="list-all-list"
                data-bs-toggle="list"
                href="#list-all"
                role="tab"
                aria-controls="list-home"
              >
                All
              </a>
              <a
                className="list-group-item list-group-item-action text-center"
                id="list-home-list"
                data-bs-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="list-home"
              >
                Home
              </a>
              <a
                className="list-group-item list-group-item-action text-center"
                id="list-profile-list"
                data-bs-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="list-profile"
              >
                Profile
              </a>
              <a
                className="list-group-item list-group-item-action text-center"
                id="list-messages-list"
                data-bs-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="list-messages"
              >
                Messages
              </a>
              <a
                className="list-group-item list-group-item-action text-center"
                id="list-settings-list"
                data-bs-toggle="list"
                href="#list-settings"
                role="tab"
                aria-controls="list-settings"
              >
                Settings
              </a>
            </div>
          </div>
          <div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="list-all"
                role="tabpanel"
                aria-labelledby="list-all-list"
              >
                All
              </div>
              <div
                className="tab-pane fade show"
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                home
              </div>
              <div
                className="tab-pane fade"
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                profile
              </div>
              <div
                className="tab-pane fade"
                id="list-messages"
                role="tabpanel"
                aria-labelledby="list-messages-list"
              >
                messages
              </div>
              <div
                className="tab-pane fade"
                id="list-settings"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
