import mongoose, { Schema, Types } from "mongoose";
import { IProductBox } from "../interfaces/product-box";

interface IBox {
  createdAt: Date,
  createdBy: Types.ObjectId,
  boxNumber: number,
  boxCounted: boolean,
  deliveryId: Types.ObjectId,
  products: IProductBox[],
}

const boxSchema = new mongoose.Schema<IBox>(
  {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, 'Box must have creator']
    },
    boxNumber: {
      type: Number,
      unique: true
    },
    boxCounted: {
      type: Boolean,
      default: false
    },
    deliveryId: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery',
        required: [true, 'Box must have a Delivery ID!']
    },
    products: [{
      // _id: false,
      productId: {
        type: mongoose.Types.ObjectId,
          ref: 'Product'
      },
      quantity: {
        type: Number
      },
      size: {
        type: String
      }
    }]
  }
);

async function getNextBoxNumber() {
  const lastBox = await Box.findOne().sort({ boxNumber: -1 });
  if (lastBox) {
    return lastBox.boxNumber! + 1;
  } else {
    return 1;
  }
}

boxSchema.pre('save', async function (next) {
  try {
    const delivery = await mongoose.model('Delivery').findById(this.deliveryId);

    if (delivery) {
      delivery.boxOnDelivery.push(this._id.toString());
      await delivery.save();
    }

    this.boxNumber = await getNextBoxNumber()
    
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Box = mongoose.model("Box", boxSchema);