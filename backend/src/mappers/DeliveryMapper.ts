import { DeliveryDetails } from "../models/DeliveryDetails";
import { UpcomingDeliveryDTO } from "../dto/UpcomingDeliveryDTO";

export class DeliveryMapper {
  public deliveryDetailsToUpcomingDeliveriesDTO(deliveryDetails: DeliveryDetails) {
    const upcomingDeliveryDTO = new UpcomingDeliveryDTO()

    upcomingDeliveryDTO.status = deliveryDetails?.status ?? null;
    upcomingDeliveryDTO.date = deliveryDetails?.date ?? null;
    upcomingDeliveryDTO.supplier = deliveryDetails.supplier?.name ?? null;

    return upcomingDeliveryDTO;
  }
}