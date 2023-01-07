import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import { ErrorResponse } from "~/utils/errorResponse";
import Category from "~/models/categoryModel";
import { zParse } from "~/middleware/validate";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "~/validation/category";
import { IProduct } from "~/models/productModel";
import { RequestWithIdParams } from "~/common/schema";
import { customSlugify } from "~/utils/slugify";

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find().select("-products");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = await zParse(RequestWithIdParams, req, res);

    const category = await Category.findById(id);

    if (!category) {
      return next(new ErrorResponse("No category found", 404));
    }

    res.status(202).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const categoryWithProducts = await Category.findOne({ slug })
      .populate<{
        products: IProduct[];
      }>("products")
      .exec();

    if (!categoryWithProducts) {
      return next(new ErrorResponse("No category found", 404));
    }
    res.status(202).json({ success: true, data: categoryWithProducts });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { name, imageUrl, description },
  } = await zParse(CreateCategorySchema, req, res);

  try {
    const category = await Category.findOne({ name });

    if (category) {
      return next(new ErrorResponse("Category already exists!", 401));
    }

    const slug = customSlugify(name);

    await Category.create({
      name,
      description,
      imageUrl,
      slug,
    });

    res.status(201);
    res.json({
      success: true,
      message: "Category successfully created",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    body,
  } = await zParse(UpdateCategorySchema, req, res);

  try {
    const category = await Category.findById(id);
    if (!category) {
      return next(new ErrorResponse("No category found", 404));
    }

    const newBody = body.name ? { ...body, slug: slugify(body.name) } : body;

    await Category.findByIdAndUpdate(id, newBody);

    res
      .status(200)
      .json({ success: true, message: "Category updated successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
  } = await zParse(RequestWithIdParams, req, res);

  try {
    const category = await Category.findById(id);
    if (!category) {
      return next(new ErrorResponse("No category found", 404));
    }

    await category.remove();
    res.status(204).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
