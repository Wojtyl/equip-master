const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Routes
const supplierRoute = require("./routes/supplierRoute");
const boxRoute = require("./routes/boxRoute");
const deliveryRoute = require("./routes/deliveryRoute");
const invoiceRoute = require("./routes/invoiceRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");

const errorController = require("./controllers/errorController");
const app = express();

//CORS
app.use(cors());

//Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Dev logging
console.log(process.env.DB_CONNECTION);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/login", authRoute);
app.use("/api/v1/suppliers", supplierRoute);
app.use("/api/v1/deliveries", deliveryRoute);
app.use("/api/v1/products", productRoute);

app.use(errorController);

module.exports = app;
