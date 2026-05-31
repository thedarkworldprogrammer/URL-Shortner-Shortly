const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const urlRoutes = require("./routes/url.routes");
const { redirectToOriginalUrl } = require("./controllers/url.controller");
const { apiLimiter, redirectLimiter } = require("./middleware/rateLimit.middleware");
const sanitizeInput = require("./middleware/sanitizeInput.middleware");
const notFoundMiddleware = require("./middleware/notFound.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.set("trust proxy", 1);

const configuredOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",").map((origin) => origin.trim())
  : "*";

app.use(
  cors({
    origin: configuredOrigins,
    methods: ["GET", "POST", "DELETE"],
  }),
);

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10kb" }));
app.use(sanitizeInput);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Shortly API is running.",
  });
});

app.use("/api/urls", apiLimiter, urlRoutes);
app.get("/:shortCode", redirectLimiter, redirectToOriginalUrl);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
