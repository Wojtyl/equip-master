import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/apiurl';

import { ListResponse } from "../../../shared/models/list-response";
import { Invoice, InvoiceForm } from "./models/invoice-model";

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  createInvoice(data: InvoiceForm) {
    return this.http.post<Invoice>(`${apiUrl}invoices`, data);
  }

  updateInvoice(data: InvoiceForm, id: string) {
    return this.http.patch<ListResponse<Invoice>>(`${apiUrl}invoices/${id}`, data);
  }

  getAllInvoices() {
    return this.http.get<ListResponse<Invoice[]>>(`${apiUrl}invoices`);
  }

  deleteInvoice(id: string) {
    return this.http.delete<ListResponse<Invoice[]>>(`${apiUrl}invoices/${id}`);
  }

  getInvoiceDetails(id: string) {
    return this.http.get<ListResponse<Invoice>>(`${apiUrl}invoices/${id}`);
  }
}
