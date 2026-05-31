const errorMiddleware = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(", "),
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "This short code already exists. Please try a different alias.",
    });
  }

  console.error(error);

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong.",
    ...(isProduction ? {} : { stack: error.stack }),
  });
};

module.exports = errorMiddleware;
