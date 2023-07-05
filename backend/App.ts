import e from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Routes
import { supplierRouter } from "./routes/supplierRoute";
import { deliveryRouter } from "./routes/deliveryRoute";
import { invoiceRouter } from "./routes/invoiceRoute";
import { authRouter } from "./routes/authRoute";
import { productRouter } from "./routes/productRoute";
import { errorController } from "./controllers/errorController";

dotenv.config({ path: "./.env" });

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
    if (process.env.NODE_ENV === "development") {
      console.log(process.env.DB_CONNECTION);
      app.use(morgan("dev"));
    }
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/suppliers", supplierRouter);
    app.use("/api/v1/deliveries", deliveryRouter);
    app.use("/api/v1/products", productRouter);
    app.use("/api/v1/invoices", invoiceRouter);

    app.use(errorController);
  }
}

export { ServerApp, app };
