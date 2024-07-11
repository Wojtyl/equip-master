import { DeliveryDetails } from "../models/DeliveryDetails";

export interface DeliveryGraphDTO {
  year: number;
  month: number;
  deliveries: DeliveryDetails[];
}