import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  suppliers: any[];

  selectedSuppliers: any[];

  filteredSuppliers: any[];

  ngOnInit() {
    this.suppliers = [{ name: 'puma' }, { name: 'dupa' }];
    this.productForm = new FormGroup({
      name: new FormControl<string | null>(null),
      supplier: new FormControl<string | null>(null),
      selectedSuppliers: new FormControl<string | null>(null),
      index: new FormControl<string | null>(null),
      category: new FormControl<string | null>(null),
      selectedCountry: new FormControl<string | null>(null),
    });
  }

  findSuppliers(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.suppliers.length; i++) {
      let supplier = this.suppliers[i];
      if (supplier.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(supplier);
        filtered.push(supplier);
      }
    }
  }

  onSubmit() {
    console.log(this.productForm);
  }
}
