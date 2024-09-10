import { Component, inject, OnInit } from '@angular/core';
import { Supplier } from "../../../../../shared/models/supplierModel";
import { SupplierService } from "../../supplier.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-supplier-add-page',
  templateUrl: './supplier-add-page.component.html',
  styleUrls: ['./supplier-add-page.component.scss'],
})
export class SupplierAddPageComponent implements OnInit {
  formData: Supplier | null
  supplierService = inject(SupplierService);
  router = inject(Router);
  ngOnInit(): void {
  }

  onSubmit() {
    this.supplierService.addSupplier(this.formData).subscribe(() => {
      window.alert('Dostawca został dodany!')
      this.router.navigate(['/suppliers'])
    });
  }

  setForm(formData: Supplier | null) {
    this.formData = formData;
  }
}
