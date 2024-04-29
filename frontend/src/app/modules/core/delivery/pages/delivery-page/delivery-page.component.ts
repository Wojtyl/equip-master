import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../../../suppliers/supplier.service';
import { Supplier } from 'src/app/shared/models/supplierModel';
import { DeliveryService } from '../../delivery-service.service';
import { Router } from '@angular/router';
import { IDeliveryList } from '../../models/delivery-list-model';
import { Invoice } from "../../../invoices/models/invoice-model";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.scss'],
})
export class DeliveryPageComponent implements OnInit {
  constructor(
    private supplierService: SupplierService,
    private deliveryService: DeliveryService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  @ViewChild('menu') menu: Menu;

  deliveryForm: FormGroup;

  suppliers: Supplier[];
  deliveries: IDeliveryList[] = [];
  supplierInvoices: Invoice[];
  items: MenuItem[];
  selectedId: string;

  ngOnInit(): void {
    this.items = [{
      label: 'Edytuj',
      command: () =>  this.onContinue(this.selectedId)
    },{
      label: 'Usuń',
      command: () =>  this.onDelete(this.selectedId)
    }]
    this.deliveryService.getAllDeliveries().subscribe(response => {
      this.deliveries = response.items;
    })
    this.initForm();
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response.items;

      this.supplierService.getSupplierInvoices(this.suppliers[0]._id).subscribe(response => {
        this.supplierInvoices = response.items;
      })
    });

    this.deliveryForm.get('supplier')?.valueChanges.subscribe((supplier: Supplier) => {
      this.supplierService.getSupplierInvoices(supplier._id).subscribe(response => {
        this.supplierInvoices = response.items;
      })
    })
  }

  initForm() {
    this.deliveryForm = this.formBuilder.group({
      supplier: '',
      date: '',
      description: '',
      invoice: '',
    });
  }

  onSubmit() {
    const data = this.deliveryForm.value;
    data.supplier = data.supplier._id;
    this.deliveryService.addDelivery(data).subscribe(() => {
      this.deliveryService.getAllDeliveries().subscribe(resData => this.deliveries = resData.items)
    });
  }

  onContinue(id: string) {
    this.router.navigate([`/delivery/create/${id}/counting`]);
  }

  onDelete(id: string):void {
    this.deliveryService.deleteDelivery(id).subscribe(() => {
      this.deliveryService.getAllDeliveries().subscribe(resData => this.deliveries = resData.items)
    })
  }

  toggleMenu(event: Event, deliveryId: string) {
    // this.menu.toggle(event)
    this.selectedId = deliveryId;
    return event;
  }
}
