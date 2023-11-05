import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../assets/apiurl";
import { Observable } from "rxjs";
import { ListResponse } from "../../shared/models/list-response";
import { IBoxDetails } from "./models/box-model";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) { }

  addBoxToDelivery(deliveryId: string): Observable<ListResponse<IBoxDetails>> {
    return this.http.post<ListResponse<IBoxDetails>>(`${apiUrl}boxes`, {
      deliveryId
    });
  }

  getBoxDetails(boxId: string): Observable<ListResponse<IBoxDetails>> {
    return this.http.get<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}`)
  }

  deleteBox(boxId: string) {
    console.log('service')
    return this.http.delete<ListResponse<IBoxDetails>>(`${apiUrl}boxes/${boxId}`)
  }
}
