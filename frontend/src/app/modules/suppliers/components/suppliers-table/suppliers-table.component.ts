import { Component, inject, Input } from '@angular/core';
import { Supplier } from "../../../../shared/models/supplierModel";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-suppliers-table',
  templateUrl: './suppliers-table.component.html',
  styleUrl: './suppliers-table.component.scss'
})
export class SuppliersTableComponent {
  @Input() suppliers: Supplier[];
  router = inject(Router);
  route = inject(ActivatedRoute);

  openDetails(i: number) {
    this.router.navigate([this.suppliers[i]._id, 'details'],
      {state: { invoice: this.suppliers[i] },
        relativeTo: this.route})
  }
}
