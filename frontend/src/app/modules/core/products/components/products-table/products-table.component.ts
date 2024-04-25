import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from "../../../../../shared/models/productModel";
import { IconService } from "../../../../../shared/services/icon.service";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {
  @Input() products: Product[];
  private iconService = inject(IconService);
  private fallbackImg: string;

  ngOnInit() {
    this.iconService.getIconInB64WithColor("picture-icon").subscribe(icon => this.fallbackImg = icon);
  }

  onImageError(product: Product) {
    product.imageUrl = this.fallbackImg;
  }

  getProductImage(product: Product) {
    return product?.imageUrl ?? this.fallbackImg;
  }
}
