import { Products } from "./product";

export type Category = {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  slug: string;
  products: Products;
  createdAt: string;
  updatedAt: string;
};

export type Categories = Array<Omit<Category, "products">>;
