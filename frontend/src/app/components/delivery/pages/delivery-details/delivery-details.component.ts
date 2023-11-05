import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeliveryDetails } from '../../models/delivery-details-model';
import { DeliveryService } from '../../delivery-service.service';
import { Subscription, take, tap } from 'rxjs';
import { BoxService } from "../../box.service";

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit, OnDestroy {
  deliveryId: string;
  delivery: IDeliveryDetails;
  subscriptions = new Subscription()

  constructor(private activeRoute: ActivatedRoute,
              private deliveryService: DeliveryService,
              private boxService: BoxService,
              private router: Router
  ) {}


  ngOnInit(): void {
    this.deliveryId = this.activeRoute.snapshot.params['id'];
    this.subscriptions.add(this.deliveryService.getDelivery(this.deliveryId).pipe(
      take(1),
      tap(delivery => this.delivery = delivery.items)
    ).subscribe())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addBox() {
    this.boxService.addBoxToDelivery(this.deliveryId).subscribe(data => {
      console.log(data);
    })
  }

  deleteBox(boxId: string) {
    this.boxService.deleteBox(boxId).subscribe();
  }

  openBox(id: string) {
    this.router.navigate(['box',id])
  }
}
