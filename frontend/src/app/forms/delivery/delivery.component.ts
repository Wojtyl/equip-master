import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../supplier-form/supplier.service';
import { Supplier } from 'src/app/models/supplierModel';
import { DeliveryService } from './delivery-service.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  constructor(private supplierService: SupplierService, private deliveryService: DeliveryService, private formBuilder: FormBuilder) {}

  deliveryForm: FormGroup;

  suppliers: Supplier[];
  deliveries: any = [];

  ngOnInit(): void {
    this.deliveryService.getAllDieliveries().subscribe(resData => {this.deliveries = resData; console.log(resData)})
    this.initForm();
    this.supplierService.getAllSuppliers().subscribe((resData) => {
      this.suppliers = resData.supplier;
    });
  }

  initForm() {
    this.deliveryForm = this.formBuilder.group({
      supplier: '',
      date: '',
      description: '',
      invoiceNumber: '',
    });
  }

  onSubmit() {
    const data = this.deliveryForm.value;
    data.supplier = data.supplier._id;
    this.deliveryService.addDelivery(data).subscribe(() => {
      this.deliveryService.getAllDieliveries().subscribe(resData => this.deliveries = resData)
    });
  }


  onDelete(id: string):void {
    this.deliveryService.deleteDelivery(id).subscribe(() => {
      this.deliveryService.getAllDieliveries().subscribe(resData => this.deliveries = resData)
    })
  }
}
