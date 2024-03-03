import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeliveryDetails } from '../../models/delivery-details-model';
import { DeliveryService } from '../../delivery-service.service';
import { Subscription, take, tap } from 'rxjs';
import { BoxService } from "../../../../shared/services/box.service";

@Component({
  selector: 'app-delivery-page-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit, OnDestroy {
  deliveryId: string;
  delivery: IDeliveryDetails;
  subscriptions = new Subscription()
  protected deliveryFinishable: boolean;

  constructor(private activeRoute: ActivatedRoute,
              private deliveryService: DeliveryService,
              private boxService: BoxService,
              private router: Router
  ) {
  }


  ngOnInit(): void {
    this.deliveryId = this.activeRoute.snapshot.params['id'];
    this.subscriptions.add(this.deliveryService.getDelivery(this.deliveryId).pipe(
      take(1),
    ).subscribe(delivery => {
      this.delivery = delivery.items;
      this.checkIfFinishable();
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addBox() {
    this.boxService.addBoxToDelivery(this.deliveryId).subscribe(data => {
      this.delivery = data.items;
    })
  }

  deleteBox(boxId: string) {
    this.boxService.deleteBox(boxId)
      .subscribe(delivery => this.delivery = delivery.items);
  }

  openBox(id: string) {
    this.router.navigate(['..', 'box', id], {relativeTo: this.activeRoute})
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
