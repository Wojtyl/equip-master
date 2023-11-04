import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../../../../forms/supplier-form/supplier.service';
import { Supplier } from 'src/app/models/supplierModel';
import { DeliveryService } from '../../delivery-service.service';
import { Router } from '@angular/router';
import { IDeliveryList } from '../../models/delivery-list-model';
import { Invoice } from "../../../invoices/models/invoice-model";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private deliveryService: DeliveryService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  deliveryForm: FormGroup;

  suppliers: Supplier[];
  deliveries: IDeliveryList[] = [];
  supplierInvoices: Invoice[];

  ngOnInit(): void {
    this.deliveryService.getAllDieliveries().subscribe(resData => {
      this.deliveries = resData.items;
    })
    this.initForm();
    this.supplierService.getAllSuppliers().subscribe((resData) => {
      this.suppliers = resData.supplier;

      this.supplierService.getSupplierInvoices(this.suppliers[0]._id).subscribe(data => {
        this.supplierInvoices = data.invoices;
      })
    });

    this.deliveryForm.get('supplier')?.valueChanges.subscribe((supplier: Supplier) => {
      this.supplierService.getSupplierInvoices(supplier._id).subscribe(data => {
        this.supplierInvoices = data.invoices;
      })
    })
  }

  initForm() {
    this.deliveryForm = this.formBuilder.group({
      supplier: '',
      date: '',
      description: '',
      invoiceId: '',
    });
  }

  onSubmit() {
    const data = this.deliveryForm.value;
    data.supplier = data.supplier._id;
    this.deliveryService.addDelivery(data).subscribe(() => {
      this.deliveryService.getAllDieliveries().subscribe(resData => this.deliveries = resData.items)
    });
  }

  onContinue(id: string) {
    this.router.navigate([`/delivery/${id}`]);
  }

  onDelete(id: string):void {
    this.deliveryService.deleteDelivery(id).subscribe(() => {
      this.deliveryService.getAllDieliveries().subscribe(resData => this.deliveries = resData.items)
    })
  }
}
