import { DeliveryDetails } from "../../delivery/models/delivery-details";

export interface DeliveryGraphDTO {
  month: number;
  year: number;
  deliveries: DeliveryDetails[];
}
