import { NextFunction, Request, Response } from "express";
import { z, ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const extractedErrors: string[] = [];
        err.errors.map(err => extractedErrors.push(err.message));
        return res.status(400).json({
          success: false,
          message: "The given data was invalid",
          errors: extractedErrors,
        });
      }
    }
  };

export async function zParse<T extends ZodSchema>(
  schema: T,
  req: Request,
  res: Response
): Promise<z.infer<T>> {
  try {
    const result = await schema.parseAsync(req);
    return result;
  } catch (err) {
    if (err instanceof ZodError) {
      const extractedErrors: Record<string, any>[] = [];
      err.errors.map(err =>
        extractedErrors.push({ [err.path[1]]: err.message })
      );
      res.status(400).json({
        success: false,
        message: "The given data was invalid",
        errors: extractedErrors,
      });
    }
  }
}
