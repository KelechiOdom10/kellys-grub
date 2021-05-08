const express = require("express");
const Category = require("../models/categoryModel");
const ErrorResponse = require("../utils/errorResponse");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getCategoryById = async (req, res, next) => {
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

/**
 * @typedef {object} createCategoryRequestBody
 * @property {string} name
 *
 * @param {express.Request<{}, {}, createCategoryRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createCategory = async (req, res, next) => {
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

/**
 * @typedef {object} updateCategoryRequestBody
 * @property {string} name
 *
 * @param {express.Request<{}, {}, updateCategoryRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateCategoryById = async (req, res, next) => {
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

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteCategoryById = async (req, res, next) => {
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

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
