const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortURLId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);

const urlDocument = mongoose.model("url_collections", urlSchema);

module.exports = urlDocument;
