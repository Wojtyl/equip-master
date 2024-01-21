import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../assets/apiurl";
import { Observable } from "rxjs";
import { ListResponse } from "../../shared/models/list-response";
import { IBoxDetails } from "./models/box-model";
import { IDeliveryDetails } from "./models/delivery-details-model";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) { }

  addBoxToDelivery(deliveryId: string): Observable<ListResponse<IDeliveryDetails>> {
    return this.http.post<ListResponse<IDeliveryDetails>>(`${apiUrl}boxes`, {
      deliveryId
    });
  }

  addProductToBox(boxId: string, body: any) {
    return this.http.post<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}`, body);
  }

  getBoxDetails(boxId: string): Observable<ListResponse<IBoxDetails>> {
    return this.http.get<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}`)
  }

  deleteBox(boxId: string) {
    return this.http.delete<ListResponse<IDeliveryDetails>>(`${apiUrl}boxes/${boxId}`)
  }

  closeBox(boxId: string) {
    return this.http.post<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}/close`,{});
  }

  removeProductFromBox(boxId: string, data: {productElementId: string}) {
    return this.http.patch<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}/removeProduct`, data);
  }
}
