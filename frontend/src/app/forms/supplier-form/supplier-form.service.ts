import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';

@Injectable({
  providedIn: 'root',
})
export class SupplierFormService {
  constructor(private http: HttpClient) {}

  addSupplier(data: any) {
    return this.http.post(`${apiUrl}suppliers`, data);
  }
}
