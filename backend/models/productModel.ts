import mongoose, { Model, Types, Schema } from "mongoose";

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
