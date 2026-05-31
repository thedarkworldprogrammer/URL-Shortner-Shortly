const crypto = require("crypto");

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DEFAULT_LENGTH = 7;

const generateShortCode = (length = DEFAULT_LENGTH) => {
  const randomBytes = crypto.randomBytes(length);
  let shortCode = "";

  for (let index = 0; index < length; index += 1) {
    const randomIndex = randomBytes[index] % ALPHABET.length;
    shortCode += ALPHABET[randomIndex];
  }

  return shortCode;
};

module.exports = generateShortCode;
