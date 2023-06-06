import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierFormService } from './supplier-form.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss'],
})
export class SupplierFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private supplierService: SupplierFormService) {}

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
    });
  }

  onSubmit() {
    this.supplierService.addSupplier(this.supplierForm.value).subscribe();
  }
}
