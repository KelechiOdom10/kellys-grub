import { Schema, model, Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: Types.ObjectId;
  isActive: boolean;
  sold: number;
  onSale: boolean;
  discountPercentage?: number;
}

export interface ProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 2000,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = model<ProductDocument>("Product", productSchema);

export default Product;
