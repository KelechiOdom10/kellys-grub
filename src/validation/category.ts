import { z } from "zod";

export const CreateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be between 2 and 10 characters long")
      .max(10, "Name must be between 2 and 10 characters long")
      .trim(),
    imageUrl: z.string().url("Image must be a valid url"),
  }),
});

export const RequestWithIdParams = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required").trim(),
  }),
});

export const UpdateCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be between 2 and 10 characters long")
      .max(10, "Name must be between 2 and 10 characters long")
      .trim()
      .optional(),
    imageUrl: z.string().url("Image must be a valid url").optional(),
  }),
});
