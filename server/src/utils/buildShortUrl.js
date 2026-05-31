const buildShortUrl = (shortCode) => {
  const defaultBaseUrl = `http://localhost:${process.env.PORT || 5000}`;
  const configuredBaseUrl = process.env.BASE_URL || defaultBaseUrl;
  const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

  return `${normalizedBaseUrl}/${shortCode}`;
};

module.exports = buildShortUrl;
