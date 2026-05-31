const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many API requests. Please try again in a few minutes.",
  },
});

const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many URL shorten requests. Please slow down and try again.",
  },
});

const redirectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many redirect requests. Please try again later.",
});

module.exports = {
  apiLimiter,
  createUrlLimiter,
  redirectLimiter,
};
