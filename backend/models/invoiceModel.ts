import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  deliveryId: {
    type: mongoose.Types.ObjectId,
  },
  invoiceNumber: {
    type: String,
    required: [true, "Invoice must have a number"],
  },
  supplierId: {
    type: mongoose.Types.ObjectId,
  },
  products: [
    {
      _id: false,
      productName: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      // type: mongoose.Types.ObjectId
    },
  ],
  date: {
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
