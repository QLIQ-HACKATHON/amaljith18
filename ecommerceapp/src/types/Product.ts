export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  stock: number;
}
