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

  public deliveryDetailsToDeliveryGraphDTOS(deliveryDetails: DeliveryDetails[]) {
    const graphDTO =  deliveryDetails.reduce((dto, delivery) => {
      const idx = (dto.findIndex(graph => graph.label === delivery.date.getMonth()));
      if (idx === -1) {
        dto.push({_ids: [delivery._id.toString()], label: delivery.date.getMonth(), date: delivery.date, count: 1} as DeliveryGraphDTO)
      } else {
        dto[idx] = {...dto[idx], count: ++dto[idx].count, _ids: [...dto[idx]._ids, delivery._id.toString()]}
      }
      return dto
    }, [] as DeliveryGraphDTO[]);

    return graphDTO;
  }
}