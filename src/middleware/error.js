const ErrorResponse = require("../utils/errorResponse");
const express = require("express");

/**
 * handles sending error responses,
 * You are expected to set the error code on the response object
 * @param  {object} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {null}
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //? Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Todo not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //? Mongoose Duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  //? Mongoose ValidationError
  if (err.name === "ValidationError") {
    const message = Object.values(error.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
