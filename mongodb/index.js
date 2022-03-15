// const MongoClient = require("mongodb").MongoClient;
// const url =
//   "mongodb+srv://Nigerian:oderinde2015@cluster0.g8ecz.mongodb.net/myFirstDatabase?retryWrites=true&w=majorit";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   db.
//   console.log("Database created!");
//   db.close();
// });

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://Nigerian:oderinde2015@cluster0.g8ecz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("success");
//   client.close();
// });

const mongoose = require("mongoose");
const paymentFeeComputationSchema = require("./model/paymentFeeComputationSchema");
const paymentDetailsSchema = require("./model/paymentDetailsSchema");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const paymentFeeComputation = mongoose.model(
  "paymentFeeComputation",
  paymentFeeComputationSchema
);

const paymentDetails = mongoose.model("paymentDetails", paymentDetailsSchema);

module.exports = { paymentDetails, paymentFeeComputation };
