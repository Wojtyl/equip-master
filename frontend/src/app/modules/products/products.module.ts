import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from "../../shared/shared.module";

import * as pages from './pages';
import * as components from './components';

@NgModule({
  declarations: [
    pages.ProductAddPageComponent,
    pages.ProductsPageComponent,
    pages.ProductDetailsPageComponent,
    components.ProductsTableComponent,
    components.ProductFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
