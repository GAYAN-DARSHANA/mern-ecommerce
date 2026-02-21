const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");


// ======================
// GET CART
// ======================
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ======================
// ADD TO CART
// ======================
router.post("/add", auth, async (req, res) => {
  try {
    const { product } = req.body;

    const user = await User.findById(req.user);

    const exist = user.cart.find(
      item => item.productId.toString() === product._id
    );

    if (exist) {
      exist.qty += 1;
    } else {
      user.cart.push({
        productId: product._id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }

    await user.save();

    res.json(user.cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ======================
// REMOVE ITEM
// ======================
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    user.cart = user.cart.filter(
      item => item.productId.toString() !== req.params.id
    );

    await user.save();

    res.json(user.cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;