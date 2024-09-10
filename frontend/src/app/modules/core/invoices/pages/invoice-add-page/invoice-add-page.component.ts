import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceForm } from "../../models/invoice-model";
import { InvoiceService } from "../../invoice.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-invoice-add-page',
  templateUrl: './invoice-add-page.component.html',
  styleUrls: ['./invoice-add-page.component.scss'],
})
export class InvoiceAddPageComponent implements OnInit {
  protected invoice: Invoice;
  protected invoiceFormData: InvoiceForm | null;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {
  }
  ngOnInit() {
  }

  onSubmit() {
    if (this.invoiceFormData) {
      this.invoiceService.createInvoice(this.invoiceFormData).subscribe(() => {
        window.alert('Faktura została dodana!');
        this.router.navigate(['/invoices'])
      });
    }
  }
}
