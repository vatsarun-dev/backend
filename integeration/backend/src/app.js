const express = require("express");
const cors = require("cors");
const productModel = require("./models/product.model.js");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.post("/product", async (req, res) => {
  try {
    let { productName, description, amount, currency, category } = req.body;
    if (!productName || !amount)
      return res.status(400).json({
        message: "all field are required",
      });
    let product = await productModel.create({
      productName,
      description,
      price: {
        amount,
        currency,
      },
      category,
    });

    return res.status(200).json({
      message: "product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = app;
