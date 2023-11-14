import { ISupplier } from "../../suppliers/models/supplier-model"
import { IBoxPreview } from "./box-model";

export interface IDeliveryDetails {
  _id: string,
  date: Date,
  deliveryBoxes: IBoxPreview[];
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
