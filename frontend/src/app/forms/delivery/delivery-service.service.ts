import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  addDelivery(data: any) {
    return this.http.post(`${apiUrl}deliveries`, data);
  }

  getAllDieliveries() {
    return this.http.get(`${apiUrl}deliveries`);
  }

  deleteDelivery(id: string) {
    return this.http.delete(`${apiUrl}deliveries/${id}`);
  }

}
