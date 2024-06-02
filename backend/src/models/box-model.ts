import mongoose from "mongoose";

interface IBox {
  _id: string,
  createdAt: {
    type: String
  },
  createdBy: {
    _id: mongoose.Types.ObjectId,
    email: string,
    name: string
  },
  products: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number
    },
    size: {
      type: String
    }
  }],
  closed: {
    type: Boolean
    default: false
  },
  deliveryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Delivery'
  },
  reopened: {
    type: Boolean,
    default: false
  }
  boxNumber: {
    type: Number
  },
}
//TODO: Adjust Interface names to better names
export interface IBoxPreview extends IBox {
  productsQuantity: number
}