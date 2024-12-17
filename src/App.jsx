import "./App.css";
import OrderComponent from "./components/OrderComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import StockComponent from "./components/StockComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<OrderComponent />}></Route>
          <Route path="/stock" element={<StockComponent />}></Route>
          <Route path="/order" element={<OrderComponent />}></Route>

          <Route path="/edit-employee/:id" element={<OrderComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
