const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");


// GET CART
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user.cart);
});


// ADD TO CART
router.post("/add", auth, async (req, res) => {
  const { product } = req.body;

  const user = await User.findById(req.user);

  const exist = user.cart.find(
    item => item.productId === product._id
  );

  if (exist) {
    exist.qty += 1;
  } else {
    user.cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  await user.save();

  res.json(user.cart);
});


// REMOVE ITEM
router.delete("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user);

  user.cart = user.cart.filter(
    item => item.productId !== req.params.id
  );

  await user.save();

  res.json(user.cart);
});

module.exports = router;