import { Invoice } from "../../invoices/models/invoice-model";
import { IDelivery } from "./delivery-model";
import { DeliveryProductQuantities } from "./delivery-product-quantities";

export interface DeliveryDetails extends IDelivery {
  invoice: Invoice;
  usersList: {
    _id: string;
    name: string;
    email: string;
  }[];
  productQuantities: DeliveryProductQuantities[]
}
