import { useState } from "react";
import "./ShoppingCart.scss";
import { useCart } from "../../context/CartContext";

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.02;
  const totalAmount = subtotal + tax;

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart ({cartItems.length} items)</h2>

      <div className="cart-container">
        <div className="cart-left">
          <h3>Order Summary</h3>

          <div className="cart-header">
            <span>Product Details</span>
            <span>Qty</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <div className="item-details">
                <img src={item.product.images[0]} alt={item.product.title} />
                <span>{item.product.title}</span>
              </div>

              <div className="item-qty">{item.quantity}</div>

              <div className="item-subtotal">
                ₹{item.product.price * item.quantity}
              </div>

              <div className="item-action">
                <button onClick={() => removeFromCart(item.product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Payment Method</h3>
          <select
            name="paymentMethod"
            value={customerInfo.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Online Payment">Online Payment</option>
          </select>

          <div className="user-info-form">
            <h3>Customer Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customerInfo.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={handleInputChange}
            />
            <textarea
              name="address"
              placeholder="Address"
              value={customerInfo.address}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="summary-details">
            <p>Price: ₹{subtotal.toFixed(2)}</p>
            <p>Shipping Fee: Free</p>
            <p>Tax (2%): ₹{tax.toFixed(2)}</p>
            <p className="total">Total Amount: ₹{totalAmount.toFixed(2)}</p>
          </div>

          <button className="place-order-btn">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
