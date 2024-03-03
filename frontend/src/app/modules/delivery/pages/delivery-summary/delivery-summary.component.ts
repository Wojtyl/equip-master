import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../../delivery-service.service";
import { ActivatedRoute } from "@angular/router";
import { DeliverySummary } from "../../models/delivery-summary";

@Component({
  selector: 'app-delivery-page-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['./delivery-summary.component.scss']
})
export class DeliverySummaryComponent implements OnInit {
  private deliveryId: string;
  protected deliverySummary: DeliverySummary[];
  constructor(private deliveryService: DeliveryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.deliveryId = this.route.snapshot.params['id'];
    this.deliveryService.getDeliverySummary(this.deliveryId).subscribe(summary => {
      this.deliverySummary = summary.items;
    })
  }
}
