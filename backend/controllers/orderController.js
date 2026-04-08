const products = require("../data/products");

let orders = [];

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.placeOrder = (req, res) => {
  const order = req.body;
  orders.push(order);

  console.log("New Order:", order);

  res.json({ message: "Order placed successfully!" });
};