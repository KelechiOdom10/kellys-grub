import { z } from "zod";
import { RequestWithIdParams } from "~/common/schema";

const ProductBody = z.object({
  name: z
    .string()
    .min(2, "Name must be between 2 and 50 characters long")
    .max(50, "Name must be between 2 and 50 characters long")
    .trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description mus not be longer than 2000 characters"),
  imageUrl: z.string().url("Image must be a valid url"),
  price: z.number().default(0),
  category: z.string().min(1, "Category Id is required").trim(),
  isActive: z.boolean().default(true).optional(),
  sold: z.number().default(0).optional(),
  onSale: z.boolean().default(false).optional(),
  discountPercentage: z.number().default(0).optional(),
});

export const CreateProductSchema = z.object({
  body: ProductBody,
});

export const UpdateProductSchema = z
  .object({
    body: ProductBody.partial(),
  })
  .merge(RequestWithIdParams);
