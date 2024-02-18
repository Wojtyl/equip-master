import { Component, OnInit } from '@angular/core';
import { InvoiceService } from "../../invoice.service";
import { Invoice } from "../../models/invoice-model";

@Component({
  selector: 'app-invoices-page',
  templateUrl: './invoices-page.component.html',
  styleUrls: ['./invoices-page.component.scss']
})
export class InvoicesPageComponent implements OnInit {
  protected invoices: Invoice[];

  constructor(public invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.invoiceService.getAllInvoices().subscribe(invoices => this.invoices = invoices.items);
  }

}
