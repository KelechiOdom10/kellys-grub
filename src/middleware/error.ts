import { Request, Response } from "express";
import { ErrorResponse, IErrorResponse } from "~/utils/errorResponse";

export const errorHandler = (
  err: IErrorResponse,
  _req: Request,
  res: Response
) => {
  let error = { ...err };

  error.message = err.message;

  //? Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse("Resource not found", 404);
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

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
