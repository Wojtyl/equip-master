import { Invoice } from "../../invoices/models/invoice-model";
import { IDelivery } from "./delivery-model";

export interface DeliveryDetails extends IDelivery {
  invoice: Invoice;
  usersList: {
    _id: string;
    name: string;
    email: string;
  }[]
}
