import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  boxOnDelivery: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Box",
    },
  ],
  invoiceId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Delivery must have an invoice"],
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  supplier: {
    type: mongoose.Types.ObjectId,
    ref: "Supplier",
    required: [true, "Delivery must have a supplier"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "You must be logged in to create new delivery"]
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'COUNTING_COMPLETED', 'FINISHED', 'TO_REOPEN', 'MISMATCHED'],
    default: 'NEW'
  },
  statuses: [{
    changedBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Status change must have a user']
    },
    status: {
      type: String,
      required: [true, 'Status change must have a new status']
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }],
  description: {
    type: String,
  },
}, {
  versionKey: false
});

deliverySchema.pre(/^find/, function (next) {
  //this.populate({
  //  path: "supplier",
  //  select: "-_id -address -addedAt -__v",
  //});
  next();
});

export const Delivery = mongoose.model("Delivery", deliverySchema);
