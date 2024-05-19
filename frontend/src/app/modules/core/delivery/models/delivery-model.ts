import { ISupplier } from "../../suppliers/models/supplier-model"
import { IBoxPreview } from "./box-model";

export interface IDelivery {
  _id: string,
  date: Date,
  deliveryBoxes: IBoxPreview[];
  invoice: {
    _id: string,
    invoiceNumber: string
  },
  closed: boolean,
  reopened: boolean,
  supplier: ISupplier,
  createdBy: {
    _id: string;
    name: string;
    email: string;
  },
  status: string,
  description: string,
  statuses: {
    changedBy: string,
    status: string,
    date: Date
    message: string
    _id: string;
  }[]
}
