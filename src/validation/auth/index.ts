import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const registerValidation = () => [
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

export const loginValidation = () => [
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

export const forgotPasswordValidation = () => [
  body("email")
    .isEmail()
    .withMessage("Email is not a valid email")
    .normalizeEmail(),
];

export const resetPasswordValidation = () => [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .trim()
    .escape(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: Record<string, any>[] = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    success: false,
    message: "The given data was invalid",
    errors: extractedErrors,
  });
};
