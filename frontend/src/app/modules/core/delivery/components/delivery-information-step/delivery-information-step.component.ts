import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupplierService } from "../../../suppliers/supplier.service";
import { forkJoin, iif, map, mergeMap, of, Subscription, tap } from "rxjs";
import { Supplier } from "../../../../../shared/models/supplierModel";
import { DeliveryService } from "../../delivery-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StepperService } from "../../../../../shared/services/stepper.service";
import { IDelivery } from "../../models/delivery-model";

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

  private deliveryId: string;
  public suppliers: Supplier[];
  public supplierInvoices: { invoiceNumber: string, _id: string }[];
  private invoicesMap: { [key: string]: { invoiceNumber: string, _id: string }[] } = {};
  private delivery: IDelivery;

  ngOnInit() {
    this.deliveryId = this.route.snapshot.params['id'];
    this.stepperService.setStep(1);

    forkJoin(this.supplierService.getAllSuppliers(), this.getDelivery$()).subscribe(
      ([suppliers, delivery]) => {
        this.suppliers = suppliers.items;
        this.delivery = delivery;
        console.log(delivery)
        this.initForm();
      }
    )
  }

  private initForm() {
    this.deliveryInformationFormGroup = this.formBuilder.group({
      supplier: ['', Validators.required],
      invoice: ['', Validators.required],
      date: [this.delivery?.date ? new Date(this.delivery.date) : null, Validators.required],
      description: [this.delivery?.description ?? '', Validators.required]
    })

    this.subscriptions.add(this.deliveryInformationFormGroup.get('supplier')?.valueChanges.pipe(
        tap(() => {
          this.deliveryInformationFormGroup.get('invoice')?.reset()
        }),
        mergeMap((supplierId) => {
          if (!this.invoicesMap[supplierId]) {
            return this.supplierService.getSupplierInvoices(supplierId).pipe(
              tap(response => {
                this.invoicesMap[supplierId] = this.supplierInvoices = response.items;
                if (this.deliveryId && this.delivery.supplier._id === supplierId) {
                  this.invoicesMap[supplierId].push({
                    invoiceNumber: this.delivery.invoice.invoiceNumber,
                    _id: this.delivery.invoice._id,
                  })
                  this.deliveryInformationFormGroup.get('invoice')?.patchValue(this.delivery.invoice._id)
                }
              }));
          } else {
            this.supplierInvoices = this.invoicesMap[supplierId];
            return of(this.invoicesMap[supplierId]);
          }
        }),
      ).subscribe()
    )

    if (this.deliveryId) this.deliveryInformationFormGroup.get('supplier')?.patchValue(this.delivery.supplier._id);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getDelivery$() {
    return iif(() => !!this.deliveryId,
      this.deliveryService.getDelivery(this.deliveryId)
        .pipe(map(response => response.items)),
      of({} as IDelivery))
  }

  createDeliveryAndNavigate() {
    const data = this.deliveryInformationFormGroup.getRawValue();
    if (this.deliveryId) {
      this.deliveryService.updateDelivery(data, this.deliveryId).subscribe(() => {
        this.router.navigate(['counting'], {relativeTo: this.route})
      })
    } else {
      this.deliveryService.addDelivery(data).subscribe(data => {
        const delivery = data.items;
        this.router.navigate([delivery._id, 'counting'], {relativeTo: this.route})
      })
    }
  }
}
