import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../../../environments/apiurl";
import { ListResponse } from "../../../../shared/models/list-response";
import { UpcomingDelivery } from "../models/UpcomingDelivery";
import { DeliveryGraphDTO } from "../models/DeliveryGraphDTO";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  constructor() { }

  public getUpcomingDeliveries() {
    return this.http.get<ListResponse<UpcomingDelivery[]>>(`${apiUrl}dashboard/upcomingDeliveries`);
  }

  getDeliveryGraph() {
    return this.http.get<ListResponse<DeliveryGraphDTO[]>>(`${apiUrl}dashboard/deliveriesGraph`)
  }
}
