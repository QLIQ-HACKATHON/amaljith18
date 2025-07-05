import { useNavigate, useParams } from "react-router-dom";
import useAxiosFetch from "../../custom-hooks/useAxiosFetch";
import type { Product } from "../../types/Product";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const navigate = useNavigate();
  const addToCart = (e) => {
    e.preventDefault();
    navigate(`/cart/${product.id}`);
  };
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useAxiosFetch<Product>(`https://dummyjson.com/products/${id}`);

  if (loading) return <p className="product-loading">Loading...</p>;
  if (error || !product) return <p>Error loading product.</p>;

  return (
    <div className="product-details-page">
      <div className="product-image">
        <img src={product.images?.[0]} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <p className="product-stock">Stock: {product.stock}</p>
        <p className="product-desc">{product.description}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
