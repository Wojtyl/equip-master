import { Component, inject, OnInit } from '@angular/core';
import { DeliveryService } from "../../delivery-service.service";
import { DeliveryDetails } from "../../models/delivery-details";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-delivery-details-page',
  templateUrl: './delivery-details-page.component.html',
  styleUrl: './delivery-details-page.component.scss'
})
export class DeliveryDetailsPageComponent implements OnInit {
  private deliveryService = inject(DeliveryService);
  private route = inject(ActivatedRoute)
  protected deliveryDetails: DeliveryDetails;
  protected isLoading = false;

  ngOnInit(): void {
    const {id} = this.route.snapshot.params;

    this.deliveryService.getDeliveryDetails(id)
      .subscribe(data => {
        this.deliveryDetails = data.items;
      }
    )
  }

  protected readonly Math = Math;
}
