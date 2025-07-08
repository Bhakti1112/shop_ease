const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb+srv://arshad:12345@cluster0.bgxlzd8.mongodb.net/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({
    name,
    price,
    description,
    image: req.file.filename,
  });
  await product.save();
  res.json(product);
});

app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const updateData = { name, price, description };
  if (req.file) updateData.image = req.file.filename;
  const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));




