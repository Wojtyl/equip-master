import mongoose, { Model, Types, Schema } from "mongoose";

interface attributes {
  size: string[];
  colour: string;
}

export interface IProduct {
  name: string;
  productIndex: string;
  attributes: attributes;
  category: string;
  description: string;
  supplierId: Types.ObjectId;
  imageUrl: string;
  createdAt: Date;
  createdBy: Types.ObjectId;
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
  description: {
    type: String,
  },
  attributes: {
    size: [
      {
        type: String,
        required: [true, "Product must have a given size"],
      },
    ],
    colour: {
      type: String,
    },
  },
  imageUrl: {
    type: String
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
    default: new Date(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  versionKey: false,
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
