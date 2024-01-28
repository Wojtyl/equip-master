import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Invoice } from "../../models/invoice-model";
import { InvoiceService } from "../../invoice.service";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-invoice-details-page',
  templateUrl: './invoice-details-page.component.html',
  styleUrls: ['./invoice-details-page.component.scss']
})
export class InvoiceDetailsPageComponent implements OnInit {

  protected invoice: Invoice;

  constructor(private route: ActivatedRoute,
              private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    console.log(window.history.state)
    this.invoice = window.history.state.invoice;

    if (!this.invoice) {
      console.log('pobieram')
      this.invoiceService.getInvoiceDetails(this.route.snapshot.params['id']).subscribe(invoice => {
        this.invoice = invoice.items;
      });
    }
  }


}
