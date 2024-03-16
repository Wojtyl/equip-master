import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupplierService } from "../../../suppliers/supplier.service";
import { mergeMap, of, Subscription, tap } from "rxjs";
import { Supplier } from "../../../../shared/models/supplierModel";
import { Invoice } from "../../../invoices/models/invoice-model";
import { DeliveryService } from "../../delivery-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StepperService } from "../../../../shared/services/stepper.service";

@Component({
  selector: 'app-delivery-information-step',
  templateUrl: './delivery-information-step.component.html',
  styleUrl: './delivery-information-step.component.scss'
})
export class DeliveryInformationStepComponent implements OnInit, OnDestroy {
  protected deliveryInformationFormGroup: FormGroup;
  protected formBuilder = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private deliveryService = inject(DeliveryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private stepperService = inject(StepperService);

  private subscriptions = new Subscription();

  public suppliers: Supplier[];
  private invoicesMap: { [key: string]: Invoice[] } = {};
  public supplierInvoices: Invoice[];

  ngOnInit() {
    this.stepperService.setStep(1);
    this.initForm();
    this.subscriptions.add(this.supplierService.getAllSuppliers().subscribe(response => this.suppliers = response.items));
  }

  private initForm() {
    this.deliveryInformationFormGroup = this.formBuilder.group({
      supplier: ['', Validators.required],
      invoice: ['', Validators.required],
      date: [null, Validators.required],
      description: ['', Validators.required]
    })

    this.subscriptions.add(this.deliveryInformationFormGroup.get('supplier')?.valueChanges.pipe(
      tap(() => {this.deliveryInformationFormGroup.get('invoice')?.reset()}),
        mergeMap((supplierId) => {
          if (!this.invoicesMap[supplierId]) {
            return this.supplierService.getSupplierInvoices(supplierId).pipe(
              tap(response => this.invoicesMap[supplierId] = this.supplierInvoices = response.items));
          } else {
            this.supplierInvoices = this.invoicesMap[supplierId];
            return of(this.invoicesMap[supplierId]);
          }
        }),
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createDeliveryAndNavigate() {
    const data = this.deliveryInformationFormGroup.getRawValue();
    this.deliveryService.addDelivery(data).subscribe(data => {
      const delivery = data.items;
      this.router.navigate([ delivery._id, 'counting'], {relativeTo: this.route})
    })
  }
}
