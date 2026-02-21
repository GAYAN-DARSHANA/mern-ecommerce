const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    title: "iPhone 15",
    price: 1200,
    description: "Latest Apple phone",
    image: "iphone.jpg",
    countInStock: 10,
  },
  {
    title: "Samsung S24",
    price: 1000,
    description: "Latest Samsung phone",
    image: "samsung.jpg",
    countInStock: 8,
  },
];
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Seeded");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();