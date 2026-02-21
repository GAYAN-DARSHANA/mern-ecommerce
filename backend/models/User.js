const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
  qty: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [cartItemSchema]
});

module.exports = mongoose.model("User", userSchema);