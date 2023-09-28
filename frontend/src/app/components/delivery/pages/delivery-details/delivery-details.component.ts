import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeliveryDetails } from '../../models/delivery-details-model';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  deliveryId: string;
  delivery: IDeliveryDetails;

  constructor(private activeRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.deliveryId = this.activeRoute.snapshot.params['id'];
  }
}
