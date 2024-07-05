const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = Schema({
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin"
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema)

module.exports = Customer;
