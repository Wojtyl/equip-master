import mongoose from "mongoose";
import { DeliveryStatus } from "../enums/delivery-status-enum";

const deliverySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  //TODO: Probably to get rid of this field - make more atomic approach and refer to boxes from box deliveryId
  boxOnDelivery: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Box",
    },
  ],
  invoice: {
    type: mongoose.Types.ObjectId,
    ref: 'Invoice',
    required: [true, "Delivery must have an invoice"],
  },
  closed: {
    type: Boolean,
    default: false,
  },
  reopened: {
    type: Boolean,
    default: false
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
    enum: DeliveryStatus,
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
    },
    message: {
      type: String,
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
