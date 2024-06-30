import { Delivery } from "../schemas/deliveryModel";
import { DeliveryDetails } from "../models/DeliveryDetails";
import { HydratedDocument } from "mongoose";

export class DashboardService {
  async getUpcomingDeliveries() {
    const upcomingDeliveries: HydratedDocument<DeliveryDetails[]> = await Delivery.find({date: {$gte: Date.now()}, status: {$ne: 'FINISHED'}})
        .populate('supplier')
        .populate('createdBy')
        .populate('invoice')
        .populate('boxOnDelivery')
        .lean();

    return upcomingDeliveries;
  }
}