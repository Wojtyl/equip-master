import { Component, inject, OnInit } from '@angular/core';
import { SupplierService } from "../../supplier.service";
import { ActivatedRoute } from "@angular/router";
import {Supplier} from "../../../../../shared/models/supplierModel";

@Component({
  selector: 'app-supplier-details-page',
  templateUrl: './supplier-details-page.component.html',
  styleUrl: './supplier-details-page.component.scss'
})
export class SupplierDetailsPageComponent implements OnInit {
  supplierService = inject(SupplierService);
  supplierId = inject(ActivatedRoute).snapshot.params['id'];
  getSupplier$ = this.supplierService.getSupplier(this.supplierId);
  supplier: Supplier;
  formData: Supplier | null;

  ngOnInit() {
    this.getSupplier$.subscribe(response => {
      this.supplier = response.items;
    })
  }

  setFormData(formData: Supplier | null) {
    this.formData = formData;
  }

  onSubmit() {
    if (this.formData) {
      this.supplierService.updateSupplier(this.formData, this.supplierId).subscribe(() => {
        window.alert('Supplier updated successfully');
      });
    }
  }
}
