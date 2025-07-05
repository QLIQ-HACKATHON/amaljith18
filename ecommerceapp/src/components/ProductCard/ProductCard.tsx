import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import "./ProductCard.scss";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const addToCart = (e) => {
    e.preventDefault();
    navigate(`/cart/${product.id}`);
  };
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img src={product.thumbnail || product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <h3>Item-Left {product.stock}</h3>
        <div className="price">
          ₹{product.price}
          {product.discountPercentage && (
            <span className="old">
              ₹
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                0
              )}
            </span>
          )}
        </div>

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;
