import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/Home";
import { FrontLayouts } from "./pages/frontLayouts/FrontLayouts";
import { Products } from "./pages/products/Products";
import { Cart } from "./pages/cart/Cart";
import { ProductDetail } from "./pages/productDetail/ProductDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayouts />}>
          <Route path="" element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
        </Route>
        <Route path="*" element={<FrontLayouts />}></Route>
      </Routes>
    </div>
  );
}

export default App;
