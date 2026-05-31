const validator = require("validator");
const HttpError = require("../utils/httpError");
const normalizeUrl = require("../utils/normalizeUrl");

const ALIAS_REGEX = /^[a-zA-Z0-9_-]{4,30}$/;

const validateCreateUrl = (req, _res, next) => {
  const { originalUrl, customAlias, expiresInDays } = req.body;

  const normalizedUrl = normalizeUrl(originalUrl);
  if (!normalizedUrl) {
    throw new HttpError(400, "Original URL is required.");
  }

  if (
    !validator.isURL(normalizedUrl, {
      require_protocol: true,
      require_valid_protocol: true,
    })
  ) {
    throw new HttpError(400, "Please enter a valid URL.");
  }

  let normalizedAlias = null;
  if (customAlias !== undefined && customAlias !== null && String(customAlias).trim() !== "") {
    normalizedAlias = String(customAlias).trim();
    if (!ALIAS_REGEX.test(normalizedAlias)) {
      throw new HttpError(
        400,
        "Custom alias must be 4-30 characters long and use only letters, numbers, hyphens, or underscores.",
      );
    }
  }

  let parsedExpiresInDays = null;
  if (expiresInDays !== undefined && expiresInDays !== null && expiresInDays !== "") {
    parsedExpiresInDays = Number(expiresInDays);

    if (!Number.isInteger(parsedExpiresInDays) || parsedExpiresInDays < 1 || parsedExpiresInDays > 3650) {
      throw new HttpError(400, "Expiration must be an integer between 1 and 3650 days.");
    }
  }

  req.validatedBody = {
    originalUrl: normalizedUrl,
    customAlias: normalizedAlias,
    expiresInDays: parsedExpiresInDays,
  };

  next();
};

module.exports = validateCreateUrl;
