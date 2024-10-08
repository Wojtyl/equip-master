import { DeliveryDetails } from "../models/DeliveryDetails";
import { UpcomingDeliveryDTO } from "../dto/UpcomingDeliveryDTO";
import { DeliveryGraphDTO } from "../dto/DeliveryGraphDTO";

export class DeliveryMapper {
  public deliveryDetailsToUpcomingDeliveriesDTO(deliveryDetails: DeliveryDetails) {
    const upcomingDeliveryDTO = new UpcomingDeliveryDTO()

    upcomingDeliveryDTO.status = deliveryDetails?.status ?? null;
    upcomingDeliveryDTO.date = deliveryDetails?.date ?? null;
    upcomingDeliveryDTO.supplier = deliveryDetails.supplier?.name ?? null;
    upcomingDeliveryDTO.invoiceNumber = deliveryDetails.invoice?.invoiceNumber ?? null;
    upcomingDeliveryDTO._id = deliveryDetails?._id?.toString() ?? null;

    return upcomingDeliveryDTO;
  }
}