import { z } from "zod";

export const RequestWithIdParams = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required").trim(),
  }),
});
