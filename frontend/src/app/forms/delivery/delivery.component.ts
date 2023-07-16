import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierFormService } from '../supplier-form/supplier-form.service';
import { Supplier } from 'src/app/models/supplierModel';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  constructor(private supplierService: SupplierFormService, private formBuilder: FormBuilder) {}

  deliveryForm: FormGroup;

  suppliers: Supplier[];

  ngOnInit(): void {
    this.initForm();
    this.supplierService.getAllSuppliers().subscribe((resData) => {
      this.suppliers = resData.supplier;
      console.log(this.suppliers);
    });
  }

  initForm() {
    this.deliveryForm = this.formBuilder.group({
      supplier: '',
      deliveryDescription: '',
      name: '',
      invoiceNumber: '',
    });
  }

  onSubmit() {}
}
