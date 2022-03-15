const express = require("express");
const app = express();

const router = require("./routers/index.js");
app.use("/", router);

app.listen(3000);
