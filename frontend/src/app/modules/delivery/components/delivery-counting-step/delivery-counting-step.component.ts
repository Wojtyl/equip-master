import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IDeliveryDetails } from "../../models/delivery-details-model";
import { Subscription, take } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { DeliveryService } from "../../delivery-service.service";
import { BoxService } from "../../../../shared/services/box.service";
import { StepperService } from "../../../../shared/services/stepper.service";

@Component({
  selector: 'app-delivery-counting-step',
  templateUrl: './delivery-counting-step.component.html',
  styleUrl: './delivery-counting-step.component.scss'
})
export class DeliveryCountingStepComponent implements OnInit, OnDestroy {
  deliveryId: string;
  delivery: IDeliveryDetails;
  isLoading = true;
  isUpdating = false;
  subscriptions = new Subscription()
  protected deliveryFinishable: boolean;
  private stepperService = inject(StepperService);

  //TODO: Quick product add: show modal which will have option to select box and items to add to box that
  // we don't need to open certain box to add product

  constructor(private activeRoute: ActivatedRoute,
              private deliveryService: DeliveryService,
              private boxService: BoxService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.stepperService.setStep(2);

    this.deliveryId = this.activeRoute.snapshot.params['id'];
    this.subscriptions.add(this.deliveryService.getDelivery(this.deliveryId).pipe(
      take(1),
    ).subscribe(delivery => {
      this.delivery = delivery.items;
      this.checkIfFinishable();
      this.isLoading = false;
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addBox() {
    this.isUpdating = true;
    this.boxService.addBoxToDelivery(this.deliveryId).subscribe(data => {
      this.router.navigate(['/delivery/box', data.items._id])
    })
  }

  deleteBox(boxId: string) {
    this.isUpdating = true;
    this.boxService.deleteBox(boxId)
      .subscribe(delivery => {
        this.delivery = delivery.items;
        setTimeout(() => this.isUpdating = false, 300)
      });
  }

  openBox(id: string) {
    this.router.navigate(['delivery', 'box', id])
  }

  checkIfFinishable() {
    this.deliveryFinishable = this.delivery.deliveryBoxes.length > 0 && this.delivery.deliveryBoxes.every(box => box.closed);
  }

  finishDelivery() {
    this.deliveryService.finishDelivery(this.deliveryId).subscribe(() => this.delivery.closed = true)
  }

  reopenDelivery() {
    this.deliveryService.reopenDelivery(this.deliveryId).subscribe(() => this.delivery.closed = false)
  }
}
