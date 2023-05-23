const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  deliveryId: {
    type: mongoose.Types.ObjectId,
  },
  invoiceNumber: {
    type: Number,
    required: [true, "Invoice must have a number"],
  },
  supplierId: {
    type: mongoose.Types.ObjectId,
  },
  productOnInvoice: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
  date: {
    type: Date,
    required: [true, "Invoice must have a date"],
  },
  invoiceValue: {
    type: Number,
    required: [true, "Invoice must have netto price"],
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
