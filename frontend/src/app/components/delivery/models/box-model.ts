import { BoxStatus } from "src/app/shared/enums/box-status-enum";

interface IBox {
  _id: string,
  createdAt: string,
  createdBy: {
    _id: string,
    email: string,
    name: string
  },
  closed: boolean,
  deliveryId: string,
  boxNumber: number,
  statuses: IBoxStatus[],
  reopened: boolean
}
export interface IBoxPreview extends IBox {
  productsQuantity: number
}

export interface IBoxDetails extends IBox {
  products: {
    productId: string,
    productIndex: string,
    name: string,
    quantity: number,
    size: string,
    _id: string
  }[]
}

export interface IBoxStatus {
  changedBy: string,
  status: BoxStatus,
  date: Date,
  message: string
}
