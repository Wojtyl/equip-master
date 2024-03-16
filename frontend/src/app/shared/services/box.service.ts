import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../environments/apiurl";
import { Observable } from "rxjs";
import { ListResponse } from "../models/list-response";
import { IBoxDetails } from "src/app/modules/delivery/models/box-model";
import { IDeliveryDetails } from "src/app/modules/delivery/models/delivery-details-model";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) { }

  addBoxToDelivery(deliveryId: string) {
    return this.http.post<ListResponse<IBoxDetails>>(`${apiUrl}boxes`, {
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
