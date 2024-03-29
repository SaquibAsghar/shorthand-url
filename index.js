const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { urlRouter, staticeRouter } = require("./routes");
const urlRoute = require("./routes/UrlRouter/url.route");
const urlDocument = require("./models/url.model");
const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/short-url")
  .then((res) =>
    console.log(
      `[CONNECTED]:${res.connection.host}: ${res.connection.port}/${res.connection.name}`
    )
  )
  .catch((err) => console.error("[ERROR]: ", err.message));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use("/api/v1/url", urlRouter);
app.use("/", staticeRouter);
app.use("/", urlRouter);

app.listen(PORT, () => console.log(`Server is up n running at port: ${PORT}`));
