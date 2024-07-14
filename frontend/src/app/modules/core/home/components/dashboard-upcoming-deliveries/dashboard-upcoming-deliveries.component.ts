import { Component, inject, Input, OnInit } from '@angular/core';
import { UpcomingDelivery } from "../../models/UpcomingDelivery";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-upcoming-deliveries',
  templateUrl: './dashboard-upcoming-deliveries.component.html',
  styleUrl: './dashboard-upcoming-deliveries.component.scss'
})
export class DashboardUpcomingDeliveriesComponent implements OnInit {
  private router = inject(Router);
  @Input() upcomingDeliveries: UpcomingDelivery[];

  ngOnInit() {
  }

  navigateToDelivery(deliveryId: string) {
    this.router.navigate(['delivery','create', deliveryId, 'counting'])
  }
}
