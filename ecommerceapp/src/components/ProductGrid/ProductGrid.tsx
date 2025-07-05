import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.scss";

const ProductGrid = () => {
  const { filteredProducts } = useProductContext();

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
