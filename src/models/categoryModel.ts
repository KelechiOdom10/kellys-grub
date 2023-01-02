import { Schema, model, Document } from "mongoose";

export interface ICategory {
  name: string;
}

export interface CategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model<CategoryDocument>("Category", categorySchema);

export default Category;
