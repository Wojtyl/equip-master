import { ServerApp, app } from "./App";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Setting path of config file for NODE_ENV variables
// dotenv.config({ path: "./config.env" });
// dotenv.config({ path: "./.env" });

// Database connection
const DB: string =
  process.env.DB_CONNECTION === "server"
    ? process.env.DB_SERVER!.replace("<password>", process.env.DB_PASSWORD!)
    : process.env.DB_LOCAL!;

mongoose
  .set("strictQuery", false)
  .connect(DB)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log(err.message));

const serverApp = new ServerApp();
serverApp.run();

const port = process.env.PORT || 5500;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
