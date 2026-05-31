const mongoose = require("mongoose");
const validator = require("validator");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            require_protocol: true,
            require_valid_protocol: true,
          }),
        message: "Please provide a valid URL including http:// or https://",
      },
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
      maxlength: 30,
    },
    shortUrl: {
      type: String,
      required: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

urlSchema.index({ shortCode: 1 }, { unique: true });
urlSchema.index({ createdAt: -1 });
urlSchema.index({ expiresAt: 1 });

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
