import Carousel from "../../components/Carousel/Carousel";
import CategoryFilterRow from "../../components/CategoryFilterRow/CategoryFilterRow";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Carousel />
      <CategoryFilterRow />
      <h2 className="product-heading">Our Popular Products</h2>
      <ProductGrid />
    </div>
  );
};

export default Home;
