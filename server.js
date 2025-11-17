const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
});
const Product = mongoose.model("Product", ProductSchema);

// Mongo connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("✅ Product Service connected to MongoDB"))
  .catch(err => console.error("❌ Mongo error (product-service):", err));

// Health
app.get("/", (req, res) => res.send("Product Service Running ✅"));

// API (frontend & order-service)
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "✅ Product added", product });
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const PORT = 8081;
app.listen(PORT, () => console.log(`Product Service on port ${PORT}`));

