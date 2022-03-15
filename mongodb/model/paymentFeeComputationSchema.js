const mongoose = require("mongoose");

const paymentFeeComputationSchema = new mongoose.Schema({
  FEEID: {
    type: Number,
    required: true,
  },
  FEECURRENCY: {
    type: String,
    required: true,
  },
  FEELOCALE: {
    type: String,
    required: true,
  },
  FEEENTITY: {
    type: String,
    required: true,
  },
  ENTITYPROPERTY: {
    type: String,
    required: true,
  },
  FEETYPE: {
    type: String,
    required: true,
  },
  FEEVALUE: {
    type: String,
    required: true,
  },
});

module.exports = paymentFeeComputationSchema;

// const paymentFeeComputation = mongoose.model(
//   "paymentFeeComputation",
//   paymentFeeComputationSchema
// );

// const paymentDetails = mongoose.model("paymentDetails", paymentDetailsSchema);
