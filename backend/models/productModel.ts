import mongoose, { Model, Types, Schema } from "mongoose";
import { Supplier } from "./supplierModel";
import { AppError } from "../utils/appError";

interface attributes {
  size: string[];
  color: string[];
}

interface IProduct {
  name: string;
  productIndex: string;
  attributes: attributes;
  category: string;
  supplierId: Types.ObjectId;
  createdAt: Date;
}

interface IProductMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<any>;
}

type ProductModel = Model<IProduct, {}, IProductMethods>;

const productSchema = new mongoose.Schema<
  IProduct,
  ProductModel,
  IProductMethods
>({
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
  supplierId: {
    type: Schema.Types.ObjectId,
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
  // const Supplier = require("./../models/supplierModel");

  const supp = await Supplier.findById(this.supplierId);

  if (supp) {
    this.supplierId = supp._id;
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
  if (this.attributes!.size.length > 0) {
    this.productIndex = [this.productIndex, this.attributes!.size].join(" ");
  }
  next();
});

// !!!! TODO
// Remove product from supplier
/*
productSchema.pre("deleteOne", function (next) {
  if (this.attributes!.size.length > 0) {
    this.productIndex = [this.productIndex, this.attributes!.size].join(" ");
  }
  next();
});
*/

export const Product = mongoose.model("Product", productSchema);
