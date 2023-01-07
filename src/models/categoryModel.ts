import { Schema, model, Document, Types } from "mongoose";

export interface ICategory {
  name: string;
  description?: string;
  imageUrl: string;
  slug: string;
  products: Types.ObjectId[];
}

export interface CategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Category = model<CategoryDocument>("Category", categorySchema);

export default Category;
