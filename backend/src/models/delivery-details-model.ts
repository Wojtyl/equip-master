import { ISupplier } from "./supplier-model"
import { IBoxPreview } from "./box-model";

export interface IDeliveryDetails {
  _id: string,
  date: Date,
  deliveryBoxes: IBoxPreview[];
  invoiceNumber: string,
  isClosed: boolean,
  supplier: ISupplier,
  createdBy: {
    _id: string,
    email: string,
    name: string
  },
  status: string,
  description: string,
  statuses: {
    changedBy: string,
    status: string,
    date: Date
  }[]
}
