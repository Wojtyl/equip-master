import { Invoice } from "../../invoices/models/invoice-model";
import { IDelivery } from "./delivery-model";
import { DeliveryProductQuantities } from "./delivery-product-quantities";
import { DeliveryComment } from "./delivery-comment";
import { UserPreview } from "./user-preview";

export interface DeliveryDetails extends IDelivery {
  invoice: Invoice;
  usersList: UserPreview[];
  comments: DeliveryComment[];
  productQuantities: DeliveryProductQuantities[]
}
