const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", orderRoutes);

// Serve frontend
app.use(express.static("../frontend"));

// ✅ ADD THIS LINE
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});