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
  email: {
    type: String,
    required: [true, "Please provide email address"]
  },
  website: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide supplier phone number"]
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
  /*
  * TODO: In future
  *        colorCode: {
        type: String,
        required: [true, "Color must have it's code"]
      },
      colorName: {
        type: String,
        required: [true, "Color must have it's name"]
      },
    colorHex: {
        type: String,
    }
  * */
  productColors: [{
    type: String
  }],
  active: {
    type: Boolean,
    default: true,
  },
  addedAt: {
    type: Date,
    default: new Date(),
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
