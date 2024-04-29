import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Invoice, InvoiceForm } from "../../models/invoice-model";
import { InvoiceService } from "../../invoice.service";

@Component({
  selector: 'app-invoice-details-page',
  templateUrl: './invoice-details-page.component.html',
  styleUrls: ['./invoice-details-page.component.scss']
})
export class InvoiceDetailsPageComponent implements OnInit {

  protected invoice: Invoice;
  public invoiceFormData: InvoiceForm | null;
  public isLoading = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private invoiceService: InvoiceService) {
  }

  ngOnInit() {
      this.invoiceService.getInvoiceDetails(this.route.snapshot.params['id']).subscribe(invoice => {
        this.invoice = invoice.items;
      });
  }

  onSubmit() {
    if (this.invoiceFormData) {
     this.invoiceService.updateInvoice(this.invoiceFormData, this.invoice._id)
       .subscribe((invoice) => {
       this.invoice = invoice.items;
     })
    }
  }

  onDelete() {
    this.invoiceService.deleteInvoice(this.invoice._id).subscribe(() => {
      this.router.navigate(['/invoices'])
    });
  }

}
