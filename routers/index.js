const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const databaseModel = require("../mongodb/index");

const paymentFeeComputation = databaseModel.paymentFeeComputation;
const paymentDetails = databaseModel.paymentDetails;

// router.get("/", (req, res) => {
//   res.send("Get route on things.");
// });

// router.post("/", (req, res) => {
//   res.send("POST route on things.");
// });

// router.get("/id/:id([0-9]{5})", (req, res) => {
//   res.send("The id you specified is " + req.params.id);
// });

// router.get("/user/:name/:id", function (req, res) {
//   res.send("id: " + req.params.id + " and name: " + req.params.name);
// });

// router.get("*", (req, res) => {
//   res.send("URL Resource not found");
// });

router.post("/fees", (req, res) => {
  const reqBody = req.body;
  if ("FeeConfigurationSpec" in req.body) {
    if (req.body.FeeConfigurationSpec !== "") {
    } else {
      res.sendStatus(500);
      res.send("The body message cannot be empty");
    }
  } else {
    res.sendStatus(404);
    res.send("forbidden object name");
  }
});

module.exports = router;
