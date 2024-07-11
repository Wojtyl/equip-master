import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/auth/user.service';
import { User } from "../../../shared/models/userModel";
import { DashboardService } from "./services/dashboard.service";
import { UpcomingDelivery } from "./models/UpcomingDelivery";
import { forkJoin, tap } from "rxjs";
import { DeliveryGraphDTO } from "./models/DeliveryGraphDTO";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService)
  private dashboardService = inject(DashboardService)

  protected user: User;
  protected upcomingDeliveries: UpcomingDelivery[];
  protected deliveriesGraphData: DeliveryGraphDTO[];

  ngOnInit(): void {
    this.userService.user.subscribe((user) => (this.user = user));
    forkJoin([
      this.dashboardService.getUpcomingDeliveries(),
      this.dashboardService.getDeliveryGraph()
    ]).pipe(
      tap(([upcomingDeliveries, graph]) => {
        this.upcomingDeliveries = upcomingDeliveries.items;
        this.deliveriesGraphData = graph.items;
      })
    ).subscribe()
  }
}
