const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectShortURL,
  handleShortURLAnalytics,
} = require("../../controller/urlController/url.controller");
const urlRoute = express.Router();

// urlRoute.get("/", (req, res) =>
//   res.status(200).json({
//     msg: "Welcome",
//     status: 200,
//     success: true,
//   })
// );

urlRoute.post("/", handleGenerateNewShortURL);
urlRoute.get("/:shortURLId", handleRedirectShortURL);
urlRoute.get("/:shortURLId/analytics", handleShortURLAnalytics);

module.exports = urlRoute;
