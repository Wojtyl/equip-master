import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { ProductFormComponent } from "src/app/modules/products/components/product-form/product-form.component";
import { ProductService } from "./product.service";


@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
