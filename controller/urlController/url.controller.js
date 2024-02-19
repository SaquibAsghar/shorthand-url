const generate = require("meaningful-string");
const urlDocument = require("../../models/url.model");

const handleGenerateNewShortURL = async (req, res) => {
  try {
    let options = {
      charLength: 5,
      custom: "random-string",
    };

    const { url } = req.body;
    if (!url)
      return res.status(400).json({
        msg: "Invalid URL provided",
        success: false,
        status: 400,
      });

    console.log("Random String: ", url);
    const response = await urlDocument.create({
      shortURLId: generate.random(options),
      redirectURL: url,
      visitHistory: [],
    });
    console.log(`[RESPONSE]: ${response}`);

    res.status(200).json({
      success: true,
      status: 201,
      response,
    });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      msg: "Something went wrong",
      success: false,
      status: 500,
    });
  }
};

const handleRedirectShortURL = async (req, res) => {
  try {
    console.log(req.url)
    const { shortURLId } = req.params;
    console.log('shortURLId', shortURLId);
    const dbResponse = await urlDocument.findOneAndUpdate(
      {
        shortURLId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!dbResponse) {
      throw new Error("Database coud not perform the operation");
    }
    console.log(`[DB_SUCCESS]: ${dbResponse}`);
    console.log(dbResponse.redirectURL);
    res.redirect(dbResponse.redirectURL);
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      msg: error.message,
      status: false,
    });
  }
};

const handleShortURLAnalytics = async (req, res) => {
  try {
    const { shortURLId } = req.params;
    console.log({ shortURLId });
    const dbResponse = await urlDocument.findOne({
      shortURLId,
    });
    console.log(dbResponse);
    res.status(200).json({
      clicks: dbResponse.visitHistory.length,
      data: dbResponse.visitHistory,
    });
  } catch (error) {
    console.log(`[ERROR] ${error.message}`);
    res.status(500).json({
      msg: error.message,
      success: false,
      status: 500,
    });
  }
};

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectShortURL,
  handleShortURLAnalytics,
};
