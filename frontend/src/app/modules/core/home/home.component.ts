import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/auth/user.service';
import { User } from "../../../shared/models/userModel";
import { DashboardService } from "./services/dashboard.service";
import { UpcomingDelivery } from "./models/UpcomingDelivery";
import { forkJoin, tap } from "rxjs";
import { DeliveryGraphDTO } from "./models/DeliveryGraphDTO";
import { TopSupplierDTO } from "./models/TopSupplierDTO";
import { TopProductDTO } from "./models/TopProductDTO";

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
  protected topSuppliers: TopSupplierDTO[];
  protected topProducts: TopProductDTO[];

  ngOnInit(): void {
    this.userService.user.subscribe((user) => (this.user = user));
    forkJoin([
      this.dashboardService.getUpcomingDeliveries(),
      this.dashboardService.getDeliveryGraph(),
      this.dashboardService.getTopSellers(),
      this.dashboardService.getTopProducts()
    ]).pipe(
      tap(([upcomingDeliveries, graph, topSuppliers, topProducts]) => {
        this.upcomingDeliveries = upcomingDeliveries.items;
        this.deliveriesGraphData = graph.items;
        this.topSuppliers = topSuppliers.items;
        this.topProducts = topProducts.items;
      })
    ).subscribe()
  }
}
