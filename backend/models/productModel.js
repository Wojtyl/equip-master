const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
  },
  productIndex: {
    type: String,
    unique: true,
  },
  attributes: {
    size: [
      {
        type: String,
        // required: [true, "Product must have a given size"],
      },
    ],
    colour: {
      type: String,
    },
  },
  category: [
    {
      type: String,
      required: [true, "Product must belong to at least one category"],
    },
  ],
  supplierTax: {
    type: Number,
    required: [true, "Product must have a supplier"],
  },
  supplierId: {
    type: mongoose.Types.ObjectId,
    ref: "Supplier",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.index({ productIndex: 1 }, { unique: true });

// ########
// For further implementation - referencing to supplier
// ########
productSchema.pre("save", async function (next) {
  const Supplier = require("./../models/supplierModel");

  const supp = await Supplier.findOne({ taxIdNum: this.supplierTax });

  if (supp) {
    this.supplier = supp._id;
    supp.productsIds.push(this._id);
    supp.save();
    next();
  }
  next(new AppError("No supplier with that ID!", 404));
});

/*
productSchema.pre(/^find/, function (next) {
  this.populate("supplier");
  next();
});
*/

//Adding size to index
productSchema.pre("save", function (next) {
  if (this.attributes.size.length > 0) {
    this.productIndex = [this.productIndex, this.attributes.size].join(" ");
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
