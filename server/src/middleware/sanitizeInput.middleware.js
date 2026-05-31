const isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]";

const isSafeKey = (key) => !key.startsWith("$") && !key.includes(".");

const sanitizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce((accumulator, [key, nestedValue]) => {
      if (!isSafeKey(key)) {
        return accumulator;
      }

      accumulator[key] = sanitizeValue(nestedValue);
      return accumulator;
    }, {});
  }

  return value;
};

const sanitizeInput = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }

  if (req.params && typeof req.params === "object") {
    req.params = sanitizeValue(req.params);
  }

  req.sanitizedQuery = sanitizeValue(req.query || {});
  next();
};

module.exports = sanitizeInput;
