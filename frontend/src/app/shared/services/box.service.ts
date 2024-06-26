import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../environments/apiurl";
import { Observable } from "rxjs";
import { ListResponse } from "../models/list-response";
import { IBoxDetails } from "src/app/modules/core/delivery/models/box-model";
import { IDelivery } from "src/app/modules/core/delivery/models/delivery-model";
import { BoxProductForm } from "../../modules/core/delivery/pages/box-details/box-details.component";

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
    return this.http.delete<ListResponse<IDelivery>>(`${apiUrl}boxes/${boxId}`)
  }

  closeBox(boxId: string) {
    return this.http.post<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}/close`,{});
  }

  editProductInBox(boxId: string, productElementId: string,  data: BoxProductForm) {
    return this.http.patch<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}/product/${productElementId}`, data);
  }

  removeProductFromBox(boxId: string, productElementId: string) {
    return this.http.delete<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}/product/${productElementId}`);
  }

  openBox(boxId: string) {
    return this.http.post<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}/open`, {})
  }
}
