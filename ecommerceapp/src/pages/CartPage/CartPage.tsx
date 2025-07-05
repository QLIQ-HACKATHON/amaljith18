import { useParams, useNavigate } from "react-router-dom";
import useAxiosFetch from "../../custom-hooks/useAxiosFetch";
import { useState } from "react";
import type { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";

import { toast } from "react-toastify";
import "./CartPage.scss";
import { useAuth } from "../../context/AuthContext";

const CartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product } = useAxiosFetch<Product>(
    `https://dummyjson.com/products/${id}`
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  if (!product) return <p>Loading...</p>;

  const total = (product.price * quantity).toFixed(2);
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  const isMax = quantity >= product.stock;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.warn("Please log in to add items to your cart.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }
    addToCart(product, quantity);
    toast.success("Product added to cart successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1500); // delay to show toast before redirect
  };

  return (
    <div className="cart-page">
      <h2 className="page-title">Our Popular Products</h2>

      <div className="product-container">
        <div className="product-left">
          <img src={product.images[0]} alt={product.title} />
        </div>

        <div className="product-right">
          <h3 className="product-title">{product.title}</h3>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}

          <div className="price-container">
            <span className="current-price">${discountedPrice}</span>
            <span className="original-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="quantity-control">
            <span className="quantity-label">Quantity (500g)</span>
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => !isMax && setQuantity((q) => q + 1)}
                disabled={isMax}
              >
                +
              </button>
            </div>
            <span className="quantity-price">= ${total}</span>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add To Cart
          </button>

          <p className="product-category">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
