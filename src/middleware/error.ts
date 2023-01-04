import { NextFunction, Request, Response } from "express";
import { ErrorResponse, IErrorResponse } from "~/utils/errorResponse";

export const errorHandler = (
  err: IErrorResponse,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  //? Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(
      `Resource not found with id of ${err.value}`,
      404
    );
  }

  //? Mongoose Duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  //? Mongoose ValidationError
  if (err.name === "ValidationError") {
    if (typeof err.errors === "object") {
      const errMsg = Object.values(err.errors).map(
        (val: { message: string }): string => val.message
      );
      error = new ErrorResponse(errMsg, 400);
    }
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
