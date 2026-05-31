const normalizeUrl = (inputUrl) => {
  const trimmedUrl = String(inputUrl || "").trim();

  if (!trimmedUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
};

module.exports = normalizeUrl;
