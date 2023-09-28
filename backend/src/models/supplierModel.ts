import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide supplier name"],
  },
  taxIdNum: {
    type: Number,
    required: [true, "Please provide a Tax ID"],
  },
  description: {
    type: String,
  },
  address: {
    street: {
      type: String,
      required: [true, "Please provide supplier address"],
    },
    postalCode: {
      type: String,
      required: [true, "Please provide supplier address"],
    },
    state: {
      type: String,
      required: [true, "Please provide supplier address"],
    },
    city: {
      type: String,
      required: [true, "Please provide supplier address"],
    },
    country: {
      type: String,
      required: [true, "Please provide supplier address"],
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
  }
});

supplierSchema.index({ taxIdNum: 1 }, { unique: true });

export const Supplier = mongoose.model("Supplier", supplierSchema);
