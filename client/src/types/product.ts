import { Category } from "./category";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  sold: number;
  onSale: boolean;
  discountPercentage?: number;
  createdAt: string;
  updatedAt: string;
};

export type Products = Product[];

export type ProductDetail = Omit<Product, "category"> & {
  category: Pick<Category, "_id" | "name" | "slug">;
};
