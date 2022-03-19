const express = require("express");
const app = express();
const fs = require("fs");
const feeConfigurationSorter = require("./utility/feeConfigurationSorter");

const bunchData =
  "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55\nLNPY8223 NGN LOCL CREDIT-CARD(GTBANK) : APPLY PERC 2.8\nLNPY8222 NGN INTL CREDIT-CARD(MASTERCARD) : APPLY PERC 3.8\nLNPY8224 NGN LOCL CREDIT-CARD(530191******2903) : APPLY PERC 3.8\nLNPY8225 NGN LOCL USSD(MTN) : APPLY PERC 3.8\nLNPY8226 NGN LOCL USSD(08032211002) : APPLY PERC 3.8";
// convert JSON object to a string
const datass = bunchData.split("\n");
const datas = "LNPY1221 NGN LOCL *(*) : APPLY PERC 1.4";

const datam = feeConfigurationSorter(datass);

// write file to disk
// fs.writeFile("./user.json", data, "utf8", (err) => {
//   if (err) {
//     console.log(`Error writing file: ${err}`);
//   } else {
//     console.log(`File is written successfully!`);
//   }
// });

// read the file
fs.readFile("./user.json", "utf8", (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    // parse JSON string to JSON object
    const databases = JSON.parse(data);

    // add a new record
    databases.push(...datam);

    // write new data back to the file
    fs.writeFile("./user.json", JSON.stringify(databases, null, 4), (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      }
    });
  }
});

const router = require("./routers/index.js");
app.use("/", router);

app.listen(3000);
