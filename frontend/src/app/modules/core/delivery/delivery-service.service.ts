import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponse } from 'src/app/shared/models/list-response';
import { apiUrl } from 'src/environments/apiurl';
import { IDelivery } from './models/delivery-model'
import { Observable } from 'rxjs';
import { IDeliveryList } from './models/delivery-list-model';
import { DeliveryProductQuantities } from "./models/delivery-product-quantities";
import { DeliveryDetails } from "./models/delivery-details";
import { DeliveryComment } from "./models/delivery-comment";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  addDelivery(data: {date: string, description: string, invoice: string, supplier: string}) {
    return this.http.post<ListResponse<IDelivery>>(`${apiUrl}deliveries`, data);
  }

  getAllDeliveries(): Observable<ListResponse<IDeliveryList[]>> {
    return this.http.get<ListResponse<IDeliveryList[]>>(`${apiUrl}deliveries`);
  }

  getDeliverySummary(deliveryId: string) {
    return this.http.get<ListResponse<DeliveryProductQuantities[]>>(`${apiUrl}deliveries/${deliveryId}/summary`);
  }

  deleteDelivery(id: string) {
    return this.http.delete(`${apiUrl}deliveries/${id}`);
  }

  getDelivery(id: string): Observable<ListResponse<IDelivery>> {
    return this.http.get<ListResponse<IDelivery>>(`${apiUrl}deliveries/${id}`);
  }

  finishDelivery(deliveryId: string) {
    return this.http.post(`${apiUrl}deliveries/${deliveryId}/close`, {});
  }

  reopenDelivery(deliveryId: string) {
    return this.http.post(`${apiUrl}deliveries/${deliveryId}/reopen`, {})
  }

  updateDelivery(data: {date: string, description: string, invoice: string, supplier: string}, deliveryId: string) {
    return this.http.patch(`${apiUrl}deliveries/${deliveryId}`, data)
  }

  getDeliveryDetails(deliveryId: string) {
    return this.http.get<ListResponse<DeliveryDetails>>(`${apiUrl}deliveries/${deliveryId}/details`);
  }

  addComment(deliveryId: string, comment: { comment: string }) {
    return this.http.post<ListResponse<DeliveryComment>>(`${apiUrl}deliveries/${deliveryId}/comments`, comment);
  }

  deleteComment(deliveryId: string, commentId: string) {
    return this.http.delete(`${apiUrl}deliveries/${deliveryId}/comments/${commentId}`);
  }
}
