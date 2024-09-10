import { Component, Input } from '@angular/core';
import { TopSupplierDTO } from "../../models/TopSupplierDTO";

@Component({
  selector: 'app-dashboard-top-sellers',
  templateUrl: './dashboard-top-sellers.component.html',
  styleUrl: './dashboard-top-sellers.component.scss'
})
export class DashboardTopSellersComponent {
  @Input() topSuppliers: TopSupplierDTO[];
}
