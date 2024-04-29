import { Component, Input } from '@angular/core';
import { Invoice } from "../../models/invoice-model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent {
  @Input() invoices: Invoice[];
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  openDetails(i: number) {
    this.router.navigate([this.invoices[i]._id, 'details'], {state: { invoice: this.invoices[i] }, relativeTo: this.route})
  }
}
