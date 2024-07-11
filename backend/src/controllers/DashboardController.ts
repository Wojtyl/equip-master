import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { NextFunction, Response } from "express";
import { DashboardService } from "../services/DashboardService";
import { DeliveryMapper } from "../mappers/DeliveryMapper";
import { UpcomingDeliveryDTO } from "../dto/UpcomingDeliveryDTO";

export class DashboardController {

  private dashboardService = new DashboardService();
  private deliveriesMapper = new DeliveryMapper();

  public getUpcomingDeliveries() {
    return catchAsync(async (req: URequest, res: Response, next: NextFunction) => {
      const deliveriesDetails = await this.dashboardService.getUpcomingDeliveries();
      const upcomingDeliveries: UpcomingDeliveryDTO[] = [];

      deliveriesDetails.forEach(delivery => {
        upcomingDeliveries.push(this.deliveriesMapper.deliveryDetailsToUpcomingDeliveriesDTO(delivery))
      })

      res.status(200).json({
        status: 'success',
        items: upcomingDeliveries
      })
    })
  }

  getDeliveriesGraphData() {
    return catchAsync(async (req: URequest, res: Response) => {
      const lastMonthsNumber = req.query.lastMonths ?? 7;
      const lastMonthDeliveries = await this.dashboardService.getLastMonthDeliveries(+lastMonthsNumber)

      const deliveryGraphDTO = this.deliveriesMapper.deliveryDetailsToDeliveryGraphDTOS(lastMonthDeliveries)

      res.status(200).json({
        status: 'success',
        items: deliveryGraphDTO
      })
    })
  }
}