import { ISupplier } from "../../suppliers/models/supplier-model"

export interface IDeliveryDetails {
  _id: string,
  date: Date,
  boxOnDelivery: {
    products: object[]
  }[],
  invoiceNumber: string,
  isClosed: boolean,
  supplier: ISupplier,
  createdBy: string,
  status: string,
  description: string,
  statuses: {
    changedBy: string,
    status: string,
    date: Date
  }[]
}
