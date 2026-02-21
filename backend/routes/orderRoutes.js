const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");


// CREATE ORDER (Checkout)
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user);

  if (!user.cart.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = user.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const order = await Order.create({
    userId: user._id,
    items: user.cart,
    total,
  });

  // Clear cart after order
  user.cart = [];
  await user.save();

  res.json(order);
});


// GET USER ORDERS
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({
    userId: req.user,
  }).sort({ createdAt: -1 });

  res.json(orders);
});

module.exports = router;