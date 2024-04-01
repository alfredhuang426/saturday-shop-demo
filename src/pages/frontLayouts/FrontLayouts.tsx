import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";

export const FrontLayouts = () => {
  return (
    <>
      <Navbar />
      <div
        style={{ marginTop: "62px", minHeight: "calc(100vh - 62px - 190px)" }}
      >
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
};
