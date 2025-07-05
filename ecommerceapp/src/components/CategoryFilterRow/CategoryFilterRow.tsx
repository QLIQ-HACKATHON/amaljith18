import { useProductContext } from "../../context/ProductContext";
import "./CategoryFilterRow.scss";
import fruitsImg from "../../assets/fresh_fruits_image.png";
import vegetablesImg from "../../assets/organic_vegitable_image.png";
import milkImg from "../../assets/amul_milk_image.png";
import bakeryImg from "../../assets/bakery_image.png";
import personalCareImg from "../../assets/dairy_product_image.png";
import grainsImg from "../../assets/organic_vegitable_image.png";
import eggsImg from "../../assets/eggs_image.png";

const categories = [
  { label: "All", value: "all", image: fruitsImg },
  { label: "Vegetables", value: "vegetables", image: vegetablesImg },
  { label: "Milk & Juice", value: "milk", image: milkImg },
  { label: "Bakery", value: "bakery", image: bakeryImg },
  { label: "Personal Care", value: "personalcare", image: personalCareImg },
  { label: "Grains", value: "grains", image: grainsImg },
  { label: "Egg & Chicken", value: "eggs", image: eggsImg },
];

const CategoryFilterRow = () => {
  const { category, setCategory } = useProductContext();

  return (
    <div className="category-row">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <div
            key={cat.value}
            className={`category-item ${
              category === cat.value ? "active" : ""
            }`}
            onClick={() => setCategory(cat.value)}
          >
            <img src={cat.image} alt={cat.label} />
            <span>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterRow;
