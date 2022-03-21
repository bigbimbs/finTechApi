const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const router = require("./routers/index.js");
app.use("/", router);
router.get("*", (req, res) => {
  res.send("URL Resource not found");
});

app.listen(PORT);
