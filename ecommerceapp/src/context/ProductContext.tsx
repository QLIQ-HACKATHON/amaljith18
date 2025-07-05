// src/context/ProductContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import useAxiosFetch from "../custom-hooks/useAxiosFetch";
import type { Product } from "../types/Product";

type ProductContextType = {
  products: Product[];
  filteredProducts: Product[];
  category: string;
  setCategory: (val: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");

  const { data, loading, error } = useAxiosFetch<{ products: Product[] }>(
    "https://dummyjson.com/products/category/groceries"
  );

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
      setFilteredProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  return (
    <ProductContext.Provider
      value={{ products, filteredProducts, category, setCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used inside ProductProvider");
  return context;
};
