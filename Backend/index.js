const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Replace <db_password> with your actual password
mongoose.connect(
  "mongodb+srv://name:pass@cluster0.tqvwfur.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post('/api/products', (req, res) => {
  console.log(req.body); // This will log the JSON or form data
  res.send("Product received");
});

// Dummy GET route for products (replace with DB logic as needed)
app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sample Product",
      price: 100,
      description: "This is a sample product.",
      image: ""
    }
  ]);
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
