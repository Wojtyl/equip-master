import { Component, Input } from '@angular/core';
import { TopProductDTO } from "../../models/TopProductDTO";

@Component({
  selector: 'app-dashboard-top-products',
  templateUrl: './dashboard-top-products.component.html',
  styleUrl: './dashboard-top-products.component.scss'
})
export class DashboardTopProductsComponent {
  @Input() topProducts: TopProductDTO[];
}
