import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, filter } from 'rxjs';
import { SupplierFormService } from '../supplier-form/supplier-form.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  suppliers: any[];

  selectedSupplier: any[];

  filteredSuppliers: any[];

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierFormService) {}

  ngOnInit() {
    this.suppliers = [];
    this.supplierService.getAllSuppliers().subscribe((resData) => {
      this.suppliers = resData.supplier;
    });
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: '',
      supplier: '6471f804717a2af5865e3c8e',
      selectedSuppliers: '',
      index: '',
      category: '',
    });
  }

  findSuppliers(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.suppliers.length; i++) {
      let supplier = this.suppliers[i];
      if (supplier.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(this.filteredSuppliers);
        filtered.push(supplier);
      }
    }

    this.filteredSuppliers = filtered;
  }

  onSelect(event: any) {
    this.selectedSupplier = event;
  }

  onSubmit() {
    console.log(this.productForm);
  }
}
