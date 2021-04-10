const ErrorResponse = require("../utils/errorResponse");

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
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
