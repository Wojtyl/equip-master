import { Component, Input, OnInit } from '@angular/core';
import { UpcomingDelivery } from "../../models/UpcomingDelivery";

@Component({
  selector: 'app-dashboard-upcoming-deliveries',
  templateUrl: './dashboard-upcoming-deliveries.component.html',
  styleUrl: './dashboard-upcoming-deliveries.component.scss'
})
export class DashboardUpcomingDeliveriesComponent implements OnInit {
  @Input() upcomingDeliveries: UpcomingDelivery[];

  ngOnInit() {
  }
}
