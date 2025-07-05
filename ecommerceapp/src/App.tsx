import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/Routes";
import Navbar from "./components/Navbar/Navbar";
import { ProductProvider } from "./context/ProductContext";
import "./App.scss";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3000} />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
