const express = require("express");
const router = express.Router();
const fs = require("fs");
const feeConfigurationSorter = require("../utility/feeConfigurationSorter");

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

router.get("*", (req, res) => {
  res.send("URL Resource not found");
});

router.post("/fees", (req, res) => {
  const reqBody = req.body;
  console.log(reqBody.FeeConfigurationSpec);

  if (reqBody.FeeConfigurationSpec !== undefined) {
    const bunchData = reqBody.FeeConfigurationSpec;
    // convert JSON object to a string
    const data = bunchData.split("\\n");
    const covertData = feeConfigurationSorter(data);

    fs.readFile("./database.json", "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        const databases = JSON.parse(data);

        // add a new record
        databases.push(...covertData);

        // write new data back to the file
        fs.writeFile(
          "./database.json",
          JSON.stringify(databases, null, 4),
          (err) => {
            if (err) {
              console.log(`Error writing file: ${err}`);
            }
          }
        );
      }
    });
    res.status = "ok";
    res.send({ status: "ok" });
    res.end();
  } else {
    res.status("500");
    res.send("Body must contain FeeConfigurationSpec");
    res.end();
  }
  // res.sendStatus(500);
  // res.send("The body message cannot be empty");
});

module.exports = router;
