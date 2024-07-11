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

  async getLastMonthDeliveries(months: number) {
    const currentDate = new Date();
    currentDate.setUTCDate(0);

    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    let newMonth = currentMonth - months;
    let newYear = currentYear;

    if (newMonth < 0) {
      newYear -= Math.ceil(Math.abs(newMonth) / 12);
      newMonth += 12;
    }

    let earlierDate = new Date(currentDate);
    earlierDate.setUTCDate(1);
    earlierDate.setUTCHours(0);
    earlierDate.setUTCMinutes(0);
    earlierDate.setUTCSeconds(0);
    earlierDate.setUTCMilliseconds(0);
    earlierDate.setUTCMonth(newMonth);
    earlierDate.setUTCFullYear(newYear);

    currentDate.setUTCHours(23);
    currentDate.setUTCMinutes(59);
    currentDate.setUTCSeconds(59);
    currentDate.setUTCMilliseconds(999);

    console.log(earlierDate, currentDate)

    const deliveries: HydratedDocument<DeliveryDetails[]> = await Delivery.find({date: {$gte: earlierDate, $lte: currentDate}})
        .populate('supplier')
        .populate('createdBy')
        .populate('invoice')
        .populate('boxOnDelivery')
        .lean();

    return deliveries;
  }
}