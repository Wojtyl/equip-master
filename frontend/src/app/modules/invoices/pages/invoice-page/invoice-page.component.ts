import { Component, OnInit } from '@angular/core';
import { InvoiceService } from "../../invoice.service";
import { Invoice } from "../../models/invoice-model";

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit {
  protected invoices: Invoice[];

  constructor(public invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.invoiceService.getAllInvoices().subscribe(invoices => this.invoices = invoices.items);
  }

}
