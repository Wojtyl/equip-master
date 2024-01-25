import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../../supplier.service';

@Component({
  selector: 'app-supplier-add-page',
  templateUrl: './supplier-add-page.component.html',
  styleUrls: ['./supplier-add-page.component.scss'],
})
export class SupplierAddPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService) {}

  supplierForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.supplierForm = this.formBuilder.group({
      name: '',
      taxIdNum: '',
      description: '',
      address: this.formBuilder.group({
        street: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
      }),
      productColors: ''
    });
  }

  onSubmit() {
    this.supplierService.addSupplier(this.supplierForm.value).subscribe();
  }
}
