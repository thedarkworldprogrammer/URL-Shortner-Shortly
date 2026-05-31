const express = require("express");
const {
  createShortUrl,
  getUrlDetails,
  getRecentUrls,
  deleteUrl,
} = require("../controllers/url.controller");
const { createUrlLimiter } = require("../middleware/rateLimit.middleware");
const validateCreateUrl = require("../middleware/validateCreateUrl.middleware");

const router = express.Router();

router.get("/recent", getRecentUrls);
router.post("/", createUrlLimiter, validateCreateUrl, createShortUrl);
router.get("/:shortCode", getUrlDetails);
router.delete("/:shortCode", deleteUrl);

module.exports = router;
