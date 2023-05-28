const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  taxIdNum: {
    type: Number,
  },
  description: {
    type: String,
  },
  address: {
    postalCode: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  contact: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
  },
  productsIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});

supplierSchema.index({ taxIdNum: 1 }, { unique: true });

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
