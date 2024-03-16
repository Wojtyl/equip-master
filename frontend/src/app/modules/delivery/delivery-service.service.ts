import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from 'src/app/shared/models/list-response';
import { apiUrl } from 'src/environments/apiurl';
import { IDeliveryDetails } from './models/delivery-details-model'
import { Observable } from 'rxjs';
import { IDeliveryList } from './models/delivery-list-model';
import { DeliverySummary } from "./models/delivery-summary";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  addDelivery(data: {date: string, description: string, invoice: string, supplier: string}) {
    return this.http.post<ListResponse<IDeliveryDetails>>(`${apiUrl}deliveries`, data);
  }

  getAllDeliveries(): Observable<ListResponse<IDeliveryList[]>> {
    return this.http.get<ListResponse<IDeliveryList[]>>(`${apiUrl}deliveries`);
  }

  getDeliverySummary(deliveryId: string) {
    return this.http.get<ListResponse<DeliverySummary[]>>(`${apiUrl}deliveries/${deliveryId}/summary`);
  }

  deleteDelivery(id: string) {
    return this.http.delete(`${apiUrl}deliveries/${id}`);
  }

  getDelivery(id: string): Observable<ListResponse<IDeliveryDetails>> {
    return this.http.get<ListResponse<IDeliveryDetails>>(`${apiUrl}deliveries/${id}`);
  }

  finishDelivery(deliveryId: string) {
    return this.http.post(`${apiUrl}deliveries/${deliveryId}/close`, {});
  }

  reopenDelivery(deliveryId: string) {
    return this.http.post(`${apiUrl}deliveries/${deliveryId}/reopen`, {})
  }
}
