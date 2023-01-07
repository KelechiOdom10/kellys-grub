import { z } from "zod";
import { RequestWithIdParams } from "~/common/schema";

const CategoryBody = z.object({
  name: z
    .string()
    .min(2, "Name must be between 2 and 50 characters long")
    .max(50, "Name must be between 2 and 50 characters long")
    .trim(),
  description: z.string().optional(),
  imageUrl: z.string().url("Image must be a valid url"),
});

export const CreateCategorySchema = z.object({
  body: CategoryBody,
});

export const UpdateCategorySchema = z
  .object({
    body: CategoryBody.partial(),
  })
  .merge(RequestWithIdParams);
