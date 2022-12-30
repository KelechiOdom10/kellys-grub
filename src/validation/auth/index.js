const { body, validationResult } = require("express-validator");
const express = require("express");

exports.registerValidation = () => [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Email is not a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .trim()
    .escape(),
];

exports.loginValidation = () => [
  body("email")
    .isEmail()
    .withMessage("Email is not a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .trim()
    .escape(),
];

exports.forgotPasswordValidation = () => [
  body("email")
    .isEmail()
    .withMessage("Email is not a valid email")
    .normalizeEmail(),
];

exports.resetPasswordValidation = () => [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .trim()
    .escape(),
];

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    success: false,
    message: "The given data was invalid",
    errors: extractedErrors,
  });
};
