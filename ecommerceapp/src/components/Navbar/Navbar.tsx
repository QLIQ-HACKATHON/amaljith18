/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import "./Navbar.scss";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color="default" elevation={1} className="navbar">
      <Toolbar className="navbar-toolbar">
        <Box className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <Box className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="nav-link">
                Admin Dashboard
              </Link>
            )}
          </Box>
        </Box>

        <Box className="navbar-center">
          <Box className="search-box">
            <SearchIcon className="search-icon" />
            <InputBase placeholder="Search..." className="search-input" />
          </Box>
        </Box>

        <Box className="navbar-right">
          <Link to="/shopping-cart">
            <IconButton className="cart-icon">
              <Badge badgeContent={cartCount} color="success">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>

          {user ? (
            <IconButton onClick={() => navigate("/user")}>
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
