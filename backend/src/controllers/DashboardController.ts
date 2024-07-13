import { catchAsync } from "../utils/catchAsync";
import { URequest } from "../interfaces/user-request";
import { NextFunction, Response } from "express";
import { DashboardService } from "../services/DashboardService";
import { DeliveryMapper } from "../mappers/DeliveryMapper";
import { UpcomingDeliveryDTO } from "../dto/UpcomingDeliveryDTO";
import { TopSupplierDTO } from "../dto/TopSupplierDTO";

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
      const lastMonthsNumber = req.query.lastMonths ?? 6;
      const lastMonthDeliveries = await this.dashboardService.getLastMonthDeliveries(+lastMonthsNumber)

      res.status(200).json({
        status: 'success',
        items: lastMonthDeliveries
      })
    })
  }

  getTopSippliers() {
    return catchAsync(async (req: URequest, res: Response) => {
      const allDeliverySuppliers = await this.dashboardService.getTopSuppliers();

      let topSuppliers: TopSupplierDTO[] = [];

      allDeliverySuppliers.forEach(supp => {
        const suppIdx = topSuppliers.findIndex(top => top._id.toString() === supp.supplier._id.toString());
        if (suppIdx === -1) {
          topSuppliers.push({_id: supp.supplier._id.toString(), name: supp.supplier.name, count: 1 })
        } else {
          topSuppliers[suppIdx].count++;
        }
      })

      topSuppliers.sort((a,b) => b.count - a.count)

      res.status(200).json({
        status: 'success',
        items: topSuppliers
      })
    });
  }
}