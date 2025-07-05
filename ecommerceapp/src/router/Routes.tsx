import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import CartPage from "../pages/CartPage/CartPage";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import UserProfile from "../pages/User/UserProfile";
import AdminDashboard from "../pages/Admin/AdminDashboard";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart/:id" element={<CartPage />} />
    <Route path="/shopping-cart" element={<ShoppingCart />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/user" element={<UserProfile />} />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
);

export default AppRoutes;
