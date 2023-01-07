import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "~/utils/errorResponse";
import Product from "~/models/productModel";
import { CreateProductSchema, UpdateProductSchema } from "~/validation/product";
import { zParse } from "~/middleware/validate";
import { RequestWithIdParams } from "~/common/schema";
import Category, { ICategory } from "~/models/categoryModel";
import { customSlugify } from "~/utils/slugify";

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({}).populate<{ category: ICategory }>(
      "category",
      "name slug"
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.status(202).json({ success: true, data: { product, relatedProducts } });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { name, ...body },
  } = await zParse(CreateProductSchema, req, res);

  try {
    const product = await Product.findOne({ name });

    if (product) {
      return next(new ErrorResponse("Product already exists!", 401));
    }

    const slug = customSlugify(name);

    const newProduct = await Product.create({
      name,
      slug,
      ...body,
    });

    await Category.updateOne(
      { _id: body.category },
      { $push: { products: newProduct._id } }
    );

    res.status(201);
    res.json({
      success: true,
      message: "Product successfully created",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
    body,
  } = await zParse(UpdateProductSchema, req, res);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }

    const newBody = body.name
      ? { ...body, slug: customSlugify(body.name) }
      : body;

    await Product.findByIdAndUpdate(id, newBody);

    res
      .status(200)
      .json({ success: true, message: "product updated successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id },
  } = await zParse(RequestWithIdParams, req, res);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }

    await Category.updateOne(
      { _id: product.category },
      { $pull: { products: product._id } }
    );
    await product.remove();
    res.status(204).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
