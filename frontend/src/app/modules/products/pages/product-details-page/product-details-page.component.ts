import { Component, inject, OnInit } from '@angular/core';
import { Product } from "../../../../shared/models/productModel";
import { ProductService } from "../../product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent implements OnInit {
  public productFormData: Product | null;
  public product: Product;
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productId: string;
  uploadFile: File;
  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId)
      .subscribe(response => this.product = response.items)
  }

  protected onSubmit() {
    const formData = new FormData();

    if (this.productFormData) {
      formData.append('product', JSON.stringify(this.productFormData));
    }

    if (this.uploadFile) {
      formData.append('image', this.uploadFile);
    }

    this.productService.updateProduct(this.productId, formData).subscribe(response => {
      window.alert("Product " + response.items.name +" was updated");
    });
  }
}
