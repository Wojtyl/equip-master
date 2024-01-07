import { ISupplier } from "./supplier-model"
import { DeliveryStatus } from "../enums/delivery-status-enum";
import { IProductBox } from "../interfaces/product-box";

export interface IDeliveryWithProducts {
  _id: string,
  date: Date,
  invoice: string,
  closed: boolean,
  reopened: boolean,
  supplier: ISupplier,
  createdBy: string,
  status: DeliveryStatus,
  description: string,
  boxDetails: {
    _id: string,
    products: IProductBox[]
  }[]
}
