const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");

// Models
const deliveryModel = require("./models/deliveryModel");
const boxModel = require("./models/boxModel");

//Setting path of config file for NODE_ENV variables
// dotenv.config({ path: "./config.env" });
// dotenv.config({ path: "./.env" });

// Database connection
const DB =
  process.env.DB_CONNECTION === "server"
    ? process.env.DB_SERVER.replace("<password>", process.env.DB_PASSWORD)
    : process.env.DB_LOCAL;

mongoose
  .set("strictQuery", false)
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log(err.message));

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
