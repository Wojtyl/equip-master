import e from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Routes
import { supplierRouter } from "./src/routes/supplierRoute";
import { deliveryRouter } from "./src/routes/deliveryRoute";
import { invoiceRouter } from "./src/routes/invoiceRoute";
import { authRouter } from "./src/routes/authRoute";
import { productRouter } from "./src/routes/productRoute";
import { categoryRouter } from "./src/routes/categoryRoute";
import { boxRouter } from './src/routes/boxRoute'
import { colorRouter } from "./src/routes/colorRoute";
import { roleRouter } from "./src/routes/roleRoute";
import { errorController } from "./src/controllers/errorController";
import { validationRouter } from "./src/routes/validationRouter";
import { profileRouter } from "./src/routes/profileRoute";
import { usersRouter } from "./src/routes/userRoute";
import { dashboardRouter } from "./src/routes/dashboardRoute";

dotenv.config({ path: "./.env" });

const app = e();

class ServerApp {
  public run(): void {
    //CORS
    app.use(cors());

    //Body parser, reading data from body into req.body
    app.use(e.json({ limit: "1000kb" }));
    app.use(e.urlencoded({ extended: true, limit: "10kb" }));

    //Cookies parser to get req.cookies
    app.use(cookieParser());

    // Dev logging
    if (process.env.NODE_ENV === "development") {
      console.log(process.env.DB_CONNECTION);
      app.use(morgan("dev"));
    }

    app.use("/images/product", e.static(`${__dirname}/public/images/products`))
    app.use("/images/profile", e.static(`${__dirname}/public/images/profile`))

    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/suppliers", supplierRouter);
    app.use("/api/v1/deliveries", deliveryRouter);
    app.use("/api/v1/products", productRouter);
    app.use("/api/v1/invoices", invoiceRouter);
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/colors", colorRouter);
    app.use("/api/v1/boxes", boxRouter);
    app.use("/api/v1/roles", roleRouter);
    app.use("/api/v1/validation", validationRouter);
    app.use("/api/v1/profile", profileRouter);
    app.use("/api/v1/users", usersRouter);
    app.use("/api/v1/dashboard", dashboardRouter);

    app.use(errorController);
  }
}

export { ServerApp, app };
