import { ISupplier } from "./supplier-model"
import { IBoxPreview } from "./box-model";
import { DeliveryStatus } from "../enums/delivery-status-enum";

export interface IDeliveryDetails {
  _id: string,
  date: Date,
  deliveryBoxes: IBoxPreview[];
  invoiceNumber: string,
  invoice: {
    _id: string,
    invoiceNumber: string
  }
  closed: boolean,
  reopened: boolean,
  supplier: ISupplier,
  createdBy: string,
  status: DeliveryStatus,
  description: string,
  statuses: {
    changedBy: string,
    status: DeliveryStatus,
    date: Date,
    message: string
  }[]
}
