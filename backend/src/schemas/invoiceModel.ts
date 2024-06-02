import { model, Schema, Types } from "mongoose";
import { IProductInvoice } from "../interfaces/product-invoice";

export interface IInvoice {
  deliveryId: Types.ObjectId,
  invoiceNumber: string,
  date: Number,
  supplier: Types.ObjectId,
  products: IProductInvoice[],
  nettoPrice: Number,
  currency: String
}

const invoiceSchema = new Schema<IInvoice>({
  deliveryId: {
    type: Schema.Types.ObjectId,
  },
  invoiceNumber: {
    type: String,
    required: [true, "Invoice must have a number"],
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, "Supplier must be provided"],
  },
  products: [
    {
      _id: false,
      name: {
        type: String,
      },
      productId: {
        type: Schema.Types.ObjectId
      },
      quantity: {
        type: Number
      },
      size: {
        type: String
      },
      color: {
        type: String
      },
      price: {
        type: Number
      }
    },
  ],
  date: {
    type: Number,
    required: [true, "Invoice must have a date"],
  },
  nettoPrice: {
    type: Number,
    required: [true, "Invoice must have netto price"],
  },
  currency: {
    type: String,
    required: [true, "Invoice must have a currency"],
  }
});

const Invoice = model<IInvoice>("Invoice", invoiceSchema);

export { Invoice };
