import mongoose from "mongoose";

interface IBox {
  _id: string,
  createdAt: {
    type: String
  },
  createdBy: {
    _id: string,
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
  boxCounted: {
    type: Boolean
  },
  deliveryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Delivery'
  },
  boxNumber: {
    type: Number
  },
}
//TODO: Adjust Interface names to better names
export interface IBoxPreview extends IBox {
  productsQuantity: number
}