import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from 'src/app/shared/models/list-response';
import { apiUrl } from 'src/assets/apiurl';
import { IDeliveryDetails } from './models/delivery-details-model'
import { Observable } from 'rxjs';
import { IDeliveryList } from './models/delivery-list-model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  addDelivery(data: any) {
    return this.http.post(`${apiUrl}deliveries`, data);
  }

  getAllDieliveries(): Observable<ListResponse<IDeliveryList[]>> {
    return this.http.get<ListResponse<IDeliveryList[]>>(`${apiUrl}deliveries`);
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
