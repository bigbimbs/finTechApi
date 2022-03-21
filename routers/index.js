const express = require("express");
const router = express.Router();
const fs = require("fs");
const feeConfigurationSorter = require("../utility/feeConfigurationSorter");

router.get("*", (req, res) => {
  res.send("URL Resource not found");
});

router.post("/fees", (req, res) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));

  if (reqBody.FeeConfigurationSpec !== undefined) {
    const bunchData = reqBody.FeeConfigurationSpec;
    // convert JSON object to a string
    const data = bunchData.split("\n");
    const covertData = feeConfigurationSorter(data);

    // write new data back to the file
    fs.writeFile(
      "./database.json",
      JSON.stringify(covertData, null, 4),
      (err) => {
        if (err) {
          res.status(202);
          res.send({
            status: 202,
            response: "Please try again Database issue",
          });
          res.end();
        }
      }
    );
    res.status = "ok";
    res.send({ status: "ok" });
    res.end();
  } else {
    res.status("500");
    res.send({
      status: 500,
      response: "Body must contain FeeConfigurationSpec",
    });
    res.end();
  }
});

router.post("/compute-transaction-fee", (req, res) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  if (
    reqBody.ID !== undefined &&
    reqBody.Amount !== undefined &&
    reqBody.Currency !== undefined &&
    reqBody.CurrencyCountry !== undefined &&
    reqBody.Customer !== undefined &&
    reqBody.PaymentEntity !== undefined
  ) {
    const { ID, Amount, Currency, CurrencyCountry, Customer, PaymentEntity } =
      reqBody;
    if (Currency !== "NGN" && CurrencyCountry !== "NG") {
      res.status(403);
      res.send({
        status: 403,
        Error: `No fee configuration for ${reqBody.Currency} transactions.`,
      });
      res.end();
    } else {
      if (
        typeof parseInt(ID) === "number" &&
        typeof parseInt(Amount) === "number" &&
        typeof Currency.toString() === "string" &&
        typeof CurrencyCountry.toString() === "string"
      ) {
        if (
          Customer.ID !== undefined &&
          Customer.EmailAddress !== undefined &&
          Customer.FullName !== undefined &&
          Customer.BearsFee !== undefined &&
          PaymentEntity.ID !== undefined &&
          PaymentEntity.Issuer !== undefined &&
          PaymentEntity.Brand !== undefined &&
          PaymentEntity.Number !== undefined &&
          PaymentEntity.SixID !== undefined &&
          PaymentEntity.Type !== undefined &&
          PaymentEntity.Country !== undefined
        ) {
          if (
            typeof parseInt(Customer.ID) === "number" &&
            typeof Customer.EmailAddress.toString() === "string" &&
            typeof Customer.FullName.toString() === "string" &&
            typeof Boolean(Customer.BearsFee) === "boolean" &&
            typeof parseInt(PaymentEntity.ID) === "number" &&
            typeof PaymentEntity.Issuer.toString() === "string" &&
            typeof PaymentEntity.Brand.toString() === "string" &&
            typeof PaymentEntity.Number.toString() === "string" &&
            typeof parseInt(PaymentEntity.SixID === "number") &&
            typeof PaymentEntity.Type.toString() === "string" &&
            typeof PaymentEntity.Country.toString() === "string"
          ) {
            fs.readFile("./database.json", "utf8", (err, data) => {
              if (err) {
                res.status(202);
                res.send({
                  status: 202,
                  response: "Please try again Database issue",
                });
                res.end();
              } else {
                // parse JSON string to JSON object
                const databases = JSON.parse(data);

                const checkFeeEntity = databases.filter((data) => {
                  if (data.FEEENTITY === PaymentEntity.Type) {
                    return data;
                  } else {
                    if (data.FEEENTITY === "ALL") {
                      return data;
                    } else if (data.ENTITYPROPERTY === "*") {
                      return data;
                    }
                  }
                });
                console.log("checkfee", checkFeeEntity);
                if (checkFeeEntity.length > 0) {
                  if (checkFeeEntity[0].FEETYPE.toString() === "PERC") {
                    const amountPaid = Amount;
                    const percValue =
                      parseFloat(checkFeeEntity[0].FEEVALUE) / 100;
                    const amountCharge =
                      parseFloat(percValue) * parseFloat(amountPaid);
                    const finalAmount = amountCharge;
                    const result = {
                      AppliedFeeID: checkFeeEntity[0].FEEID,
                      AppliedFeeValue: parseInt(finalAmount.toFixed(0)),
                      ChargeAmount: parseFloat(Amount) + finalAmount,
                      SettlementAmount: Customer.BearsFee
                        ? Amount + finalAmount
                        : Amount - finalAmount,
                      using: "perc",
                    };

                    res.send({
                      status: 200,
                      response: result,
                    });
                  } else if (checkFeeEntity[0].FEETYPE.toString() === "FLAT") {
                    const amountCharge = checkFeeEntity[0].FEEVALUE;
                    const finalAmount = amountCharge;
                    const result = {
                      AppliedFeeID: checkFeeEntity[0].FEEID,
                      AppliedFeeValue: amountCharge,
                      ChargeAmount: Amount + finalAmount,
                      SettlementAmount: Customer.BearsFee
                        ? Amount + finalAmount
                        : Amount - finalAmount,
                      using: "flat",
                    };

                    res.send({
                      status: 200,
                      response: result,
                    });
                  } else if (
                    checkFeeEntity[0].FEETYPE.toString() === "FLAT_PERC"
                  ) {
                    const flatPerc = checkFeeEntity[0].FEEVALUE.split(":");
                    const flat = parseInt(flatPerc[0]);
                    const perc = (parseFloat(flatPerc[1]) / 100) * Amount;
                    const finalChargeFee = parseFloat(perc) + parseFloat(flat);
                    const result = {
                      AppliedFeeID: checkFeeEntity[0].FEEID,
                      AppliedFeeValue: finalChargeFee.toFixed(0),
                      ChargeAmount: (
                        parseFloat(Amount) + finalChargeFee
                      ).toFixed(0),
                      SettlementAmount: Customer.BearsFee
                        ? (parseFloat(Amount) + finalChargeFee).toFixed(0)
                        : parseFloat(Amount) - finalAmount,
                    };

                    res.send({
                      status: 200,
                      response: result,
                    });
                  }
                } else {
                  res.status(404);
                  res.send({
                    status: 404,
                    Error: "No fee configuration for USD transactions.",
                  });
                }

                res.end();
              }
            });
          } else {
            res.status(500);
            res.send({
              status: 500,
              response:
                "Customer ID must be of type number, Customer EmailAdress, FullName must be of type string, Customer BearsFee must be of type boolean, PaymentEntity ID and SixID must be of type number and PaymentEntity Issuer, Brand, Number, SixID, Type, Country must be of type string",
            });
            res.end();
          }
        } else {
          res.status(500);
          res.send({
            status: 500,
            response:
              "Body must contain ID, EmailAdress, FullName, BearsFee, in Customer Property and ID, Issuer, Brand, Number, SixID, Type, Country in Payment Entity Property",
          });
          res.end();
        }
      } else {
        res.status(500);
        res.send({
          status: 500,
          response:
            "ID and Amount must be of type number while Currency and CurrencyCountry must be of type string",
        });
        res.end();
      }
    }
  } else {
    res.status(500);
    res.send({
      status: 500,
      response:
        "Body must contain ID, Amount, Currency,  CurrencyCountry, Customer, PaymentEntity",
    });
    res.end();
  }
});

module.exports = router;
