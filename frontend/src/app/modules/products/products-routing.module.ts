import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as components from "./components";
import { ProductService } from "./product.service";

const routes: Routes = [
  {
    path: '',
    component: components.ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductService]
})
export class ProductsRoutingModule { }
