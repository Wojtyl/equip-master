import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  dateOfDelivery: {
    type: Date,
    default: Date.now(),
  },
  boxOnDelivery: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Box",
    },
  ],
  invoiceNumber: {
    type: mongoose.Types.ObjectId,
    required: [true, "Delivery must have an invoice"],
  },
  // issuanceNumber: {
  //   type: Number,
  //   required: [true, "Delivery must have an issuance"],
  // },
  deliveryClosed: {
    type: Boolean,
    default: false,
  },
  supplierTaxId: {
    type: Number,
    required: [true, "Provide supplier tax UID"],
  },
  supplier: {
    type: mongoose.Types.ObjectId,
    ref: "Supplier",
    required: [true, "Delivery must have a supplier"],
  },
  description: {
    type: String,
  },
});

deliverySchema.pre(/^find/, function (next) {
  //this.populate({
  //  path: "supplier",
  //  select: "-_id -address -addedAt -__v",
  //});
  next();
});

export const Delivery = mongoose.model("Delivery", deliverySchema);
