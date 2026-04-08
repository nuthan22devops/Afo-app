const express = require("express");
const router = express.Router();

const {
  getProducts,
  placeOrder
} = require("../controllers/orderController");

router.get("/products", getProducts);
router.post("/order", placeOrder);

module.exports = router;