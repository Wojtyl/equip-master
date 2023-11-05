import { Product } from "./product-model";

interface IBox {
  _id: string,
  createdAt: string,
  createdBy: {
    _id: string,
    email: string,
    name: string
  },
  boxCounted: boolean,
  deliveryId: string,
  boxNumber: number,
}
export interface IBoxPreview extends IBox {
  productsQuantity: number
}

export interface IBoxDetails extends IBox {
  products: Product[]
}
