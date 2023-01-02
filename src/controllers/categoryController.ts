import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "~/utils/errorResponse";
import Category from "../models/categoryModel";

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({});
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
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorResponse("No category found", 404));
    }
    res.status(202).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "You must enter a category name." });
  }

  try {
    const category = await Category.findOne({ name });

    if (category) {
      return next(new ErrorResponse("Category already exists!", 401));
    }

    await Category.create({
      name,
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
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return next(new ErrorResponse("No category found", 404));
    }

    await Category.findByIdAndUpdate(id, req.body);

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
  const { id } = req.params;
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
