import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "src/environments/apiurl";
import { ListResponse } from "src/app/shared/models/list-response";
import { UpcomingDelivery } from "src/app/modules/core/home/models/UpcomingDelivery";
import { DeliveryGraphDTO } from "src/app/modules/core/home/models/DeliveryGraphDTO";
import { TopSupplierDTO } from "src/app/modules/core/home/models/TopSupplierDTO";
import { TopProductDTO } from "src/app/modules/core/home/models/TopProductDTO";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  constructor() { }

  public getUpcomingDeliveries() {
    return this.http.get<ListResponse<UpcomingDelivery[]>>(`${apiUrl}dashboard/upcomingDeliveries`);
  }

  public getDeliveryGraph() {
    return this.http.get<ListResponse<DeliveryGraphDTO[]>>(`${apiUrl}dashboard/deliveriesGraph`)
  }

  public getTopSellers() {
    return this.http.get<ListResponse<TopSupplierDTO[]>>(`${apiUrl}dashboard/topSuppliers`)
  }

  public getTopProducts() {
    return this.http.get<ListResponse<TopProductDTO[]>>(`${apiUrl}dashboard/topProducts`)
  }
}
