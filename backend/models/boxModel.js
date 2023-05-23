const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema(
  {
    boxNumber: {
      type: Number,
    },
    deliveryId: {
      type: String,
    },
    productsInBox: {
      type: Array,
    },
  },
  {
    // collection: "magazyn",
  }
);

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
