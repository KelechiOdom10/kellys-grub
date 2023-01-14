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
