const express = require("express");
const router = express.Router();

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

// router.get("*", (req, res) => {
//   res.send("URL Resource not found");
// });

router.post("/fees", (req, res) => {
  const reqBody = req.body;
  if ("FeeConfigurationSpec" in req.body) {
    if (req.body.FeeConfigurationSpec !== "") {
      const bunchData =
        "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55\nLNPY8223 NGN LOCL CREDIT-CARD(GTBANK) : APPLY PERC 2.8\nLNPY8222 NGN INTL CREDIT-CARD(MASTERCARD) : APPLY PERC 3.8\nLNPY8224 NGN LOCL CREDIT-CARD(530191******2903) : APPLY PERC 3.8\nLNPY8225 NGN LOCL USSD(MTN) : APPLY PERC 3.8\nLNPY8226 NGN LOCL USSD(08032211002) : APPLY PERC 3.8";
      // convert JSON object to a string
      const data = bunchData.split("\n");
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
      // res.sendStatus(500);
      // res.send("The body message cannot be empty");
    }
  } else {
    res.sendStatus(404);
    res.send("forbidden object name");
  }
});

module.exports = router;
