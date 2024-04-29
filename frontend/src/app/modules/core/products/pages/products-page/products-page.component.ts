import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from "../../product.service";
import { Product } from "../../../../../shared/models/productModel";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  private productsService = inject(ProductService);
  public products: Product[];

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(response => {
      this.products = response.items;
    })
  }
}
