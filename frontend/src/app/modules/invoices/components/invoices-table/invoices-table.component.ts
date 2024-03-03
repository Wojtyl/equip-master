import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from "../../models/invoice-model";
import { ActivatedRoute, Router } from "@angular/router";
import { InvoiceService } from "../../invoice.service";

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {

  @Input() invoices: Invoice[];
  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  openDetails(i: number) {
    this.router.navigate([this.invoices[i]._id, 'details'], {state: { invoice: this.invoices[i] }, relativeTo: this.route})
  }

  deleteInvoice(i: number) {
    this.invoiceService.deleteInvoice(this.invoices[i]._id).subscribe(invoices => console.log(invoices))
  }
}
