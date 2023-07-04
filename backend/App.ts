// const express = require("express");
import e from "express";
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Routes
import { supplierRouter } from "./routes/supplierRoute";
import { deliveryRouter } from "./routes/deliveryRoute";
import { invoiceRouter } from "./routes/invoiceRoute";
import { authRouter } from "./routes/authRoute";
import { productRouter } from "./routes/productRoute";


const errorController = require("./controllers/errorController");
// const app = express();
const app = e();

class ServerApp {
  public run(): void {
    //CORS
    app.use(cors());

    //Body parser, reading data from body into req.body
    app.use(e.json({ limit: "10kb" }));
    app.use(e.urlencoded({ extended: true, limit: "10kb" }));

    //Cookies parser to get req.cookies
    app.use(cookieParser());

    // Dev logging
    console.log(process.env.DB_CONNECTION);
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"));
    }
    // app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/suppliers", supplierRouter);
    // app.use("/api/v1/deliveries", deliveryRouter);
    // app.use("/api/v1/products", productRouter);
    // app.use("/api/v1/invoices", invoiceRouter);

    app.use(errorController);
  }
}

export { ServerApp, app };
