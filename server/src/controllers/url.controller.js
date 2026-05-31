const QRCode = require("qrcode");
const Url = require("../models/url.model");
const HttpError = require("../utils/httpError");
const generateShortCode = require("../utils/generateShortCode");
const buildShortUrl = require("../utils/buildShortUrl");

const MAX_GENERATION_ATTEMPTS = 7;
const DEFAULT_RECENT_LIMIT = 10;
const MAX_RECENT_LIMIT = 20;

const formatUrlResponse = (urlDocument, qrCodeDataUrl = null) => ({
  id: urlDocument._id,
  originalUrl: urlDocument.originalUrl,
  shortCode: urlDocument.shortCode,
  shortUrl: urlDocument.shortUrl,
  clicks: urlDocument.clicks,
  createdAt: urlDocument.createdAt,
  expiresAt: urlDocument.expiresAt,
  qrCode: qrCodeDataUrl,
});

const isUrlExpired = (urlDocument) =>
  Boolean(urlDocument.expiresAt && urlDocument.expiresAt.getTime() <= Date.now());

const getReusableUrl = async (originalUrl) =>
  Url.findOne({
    originalUrl,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  }).sort({ createdAt: -1 });

const createUniqueShortCode = async () => {
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt += 1) {
    const candidateCode = generateShortCode();
    const isTaken = await Url.exists({ shortCode: candidateCode });

    if (!isTaken) {
      return candidateCode;
    }
  }

  throw new HttpError(500, "Unable to generate a unique short code. Please try again.");
};

const createShortUrl = async (req, res) => {
  const { originalUrl, customAlias, expiresInDays } = req.validatedBody;

  if (!customAlias) {
    const existingUrl = await getReusableUrl(originalUrl);
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        message: "This URL was already shortened recently. Returning existing link.",
        data: formatUrlResponse(existingUrl),
      });
    }
  }

  let shortCode = customAlias;
  if (shortCode) {
    const existingAlias = await Url.exists({ shortCode });
    if (existingAlias) {
      throw new HttpError(409, "This custom alias is already in use.");
    }
  } else {
    shortCode = await createUniqueShortCode();
  }

  const shortUrl = buildShortUrl(shortCode);
  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
    : null;

  const createdUrl = await Url.create({
    originalUrl,
    shortCode,
    shortUrl,
    expiresAt,
  });

  const qrCodeDataUrl = await QRCode.toDataURL(shortUrl, {
    width: 220,
    margin: 1,
    errorCorrectionLevel: "M",
  });

  return res.status(201).json({
    success: true,
    message: "Short URL created successfully.",
    data: formatUrlResponse(createdUrl, qrCodeDataUrl),
  });
};

const redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  const urlDocument = await Url.findOne({ shortCode });

  if (!urlDocument) {
    return res.status(404).send("Sorry, this short link does not exist.");
  }

  if (isUrlExpired(urlDocument)) {
    return res.status(410).send("This short link has expired.");
  }

  await Url.updateOne({ _id: urlDocument._id }, { $inc: { clicks: 1 } });
  return res.redirect(302, urlDocument.originalUrl);
};

const getUrlDetails = async (req, res) => {
  const { shortCode } = req.params;
  const urlDocument = await Url.findOne({ shortCode });

  if (!urlDocument) {
    throw new HttpError(404, "URL not found.");
  }

  return res.status(200).json({
    success: true,
    data: formatUrlResponse(urlDocument),
  });
};

const getRecentUrls = async (req, res) => {
  const requestedLimit = Number(req.sanitizedQuery?.limit);
  const limit =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, MAX_RECENT_LIMIT)
      : DEFAULT_RECENT_LIMIT;

  const recentUrls = await Url.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("originalUrl shortCode shortUrl clicks createdAt expiresAt");

  return res.status(200).json({
    success: true,
    count: recentUrls.length,
    data: recentUrls.map((urlDocument) => formatUrlResponse(urlDocument)),
  });
};

const deleteUrl = async (req, res) => {
  const { shortCode } = req.params;
  const deletedUrl = await Url.findOneAndDelete({ shortCode });

  if (!deletedUrl) {
    throw new HttpError(404, "URL not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Short URL deleted successfully.",
  });
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlDetails,
  getRecentUrls,
  deleteUrl,
};
