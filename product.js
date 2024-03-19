const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  contact: Number,
  email: String,
  age: Number,
});

module.exports = mongoose.model("product", productSchema);
