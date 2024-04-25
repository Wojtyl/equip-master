import { Component, inject, OnInit } from '@angular/core';
import { SupplierService } from "../../supplier.service";
import {Supplier} from "../../../../../shared/models/supplierModel";

@Component({
  selector: 'app-suppliers-list-page',
  templateUrl: './suppliers-list-page.component.html',
  styleUrl: './suppliers-list-page.component.scss'
})
export class SuppliersListPageComponent implements OnInit {
  supplierService = inject(SupplierService);
  suppliers: Supplier[];

  ngOnInit() {
    this.supplierService.getAllSuppliers().subscribe(response => this.suppliers = response.items);
  }
}
