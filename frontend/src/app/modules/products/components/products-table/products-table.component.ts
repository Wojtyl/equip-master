import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from "../../../../shared/models/productModel";
import { ActivatedRoute, Router } from "@angular/router";
import { IconService } from "../../../../shared/services/icon.service";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {
  @Input() products: Product[];
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private iconService = inject(IconService);
  fallbackImg: string;

  ngOnInit() {
    this.iconService.getIconInB64WithColor("picture-icon").subscribe(icon => this.fallbackImg = icon);
  }

  openDetails(i: number) {
    this.router.navigate([this.products[i]._id, 'details'], {state: { invoice: this.products[i] }, relativeTo: this.route})
  }

  onImageError(product: Product) {
    product.imageUrl = this.fallbackImg;
  }
}
