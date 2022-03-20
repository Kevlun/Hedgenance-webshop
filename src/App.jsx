import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductPage from "./pages/ProductPage";
import SingleProduct from "./pages/SingleProduct";
import MyAccount from "./pages/MyAccount";
import Trades from "./pages/Trades";
import Fundings from "./pages/Fundings";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/myaccount" element={<MyAccount />}></Route>
        <Route path="/trades" element={<Trades />}></Route>
        <Route path="/fundings" element={<Fundings />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
