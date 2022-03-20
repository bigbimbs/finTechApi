const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.LOCALHOSTPORT || "8080";
const router = require("./routers/index.js");
app.use("/api/v1", router);
router.get("*", (req, res) => {
  res.send("URL Resource not found");
});

app.listen(PORT);
