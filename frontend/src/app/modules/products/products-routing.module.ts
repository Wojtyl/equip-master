import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as components from "./pages";
import { ProductService } from "./product.service";

const routes: Routes = [
  {
    path: '',
    component: components.ProductsPageComponent
  },
  {
    path: ':id/edit',
    component: components.ProductDetailsPageComponent
  },
  {
    path: 'add',
    component: components.ProductAddPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductService]
})
export class ProductsRoutingModule { }
