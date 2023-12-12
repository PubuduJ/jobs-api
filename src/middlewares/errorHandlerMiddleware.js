const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later"
  }

  // Handle mongoose cast errors
  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.message = `No item found with id: ${err.value}`;
  }

  // Handle mongoose validation errors
  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = Object.values(err.errors).map((item) => {
      return item.message;
    }).join(", ");
  }

  // Handle mongoose duplicate errors
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
  }
  return res.status(customError.statusCode).json({ message:customError.message });
}

module.exports = errorHandlerMiddleware;
