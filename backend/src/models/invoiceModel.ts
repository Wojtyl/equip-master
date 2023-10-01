import mongoose, { Schema, Types } from "mongoose";
import { IProductInvoice } from "../interfaces/product-invoice";

interface IInvoice {
  deliveryId: Types.ObjectId,
  invoiceNumber: string,
  createdAt: Date,
  supplierId: Types.ObjectId,
  products: IProductInvoice[],
  nettoPrice: Number,
}

const invoiceSchema = new mongoose.Schema<IInvoice>({
  deliveryId: {
    type: Schema.Types.ObjectId,
  },
  invoiceNumber: {
    type: String,
    required: [true, "Invoice must have a number"],
  },
  supplierId: {
    type: Schema.Types.ObjectId,
  },
  products: [
    {
      _id: false,
      name: {
        type: String,
      },
      productId: {
        type: String
      },
      quantity: {
        type: Number
      },
      size: {
        type: String
      },
      color: {
        type: String
      }
    },
  ],
  createdAt: {
    type: Date,
    required: [true, "Invoice must have a date"],
  },
  nettoPrice: {
    type: Number,
    required: [true, "Invoice must have netto price"],
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export { Invoice };
