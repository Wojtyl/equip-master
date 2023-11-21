import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BoxService } from "../../box.service";
import { IBoxDetails } from "../../models/box-model";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Product } from "../../../../models/productModel";
import { ProductService } from "../../../../forms/product-form/product.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent implements  OnInit {

  constructor(private route: ActivatedRoute,
              private boxService: BoxService,
              private productService: ProductService,
              private location: Location,
              private formBuilder: UntypedFormBuilder) {}
  boxId: string;
  boxDetails: IBoxDetails;
  addProductForm: UntypedFormGroup;
  products: Product[];
  selectedProduct: Product;
  isAddingProduct = false;
  ngOnInit() {
    this.boxId = this.route.snapshot.params['id'];
    this.boxService.getBoxDetails(this.boxId).subscribe(box => this.boxDetails = box.items);
    this.productService.getDeliveryProductsByBox(this.boxId).subscribe(products => {
      this.products = products.items;
    });
    this.addProductForm = this.formBuilder.group({
      productId: [null],
      quantity: [null],
      size: [null]
    })
    this.addProductForm.get('productId')!.valueChanges.subscribe(val => {
      this.selectedProduct = this.products.find(prod => prod._id === val)!;
      console.log(this.selectedProduct)
      this.addProductForm.patchValue({quantity: null, size: null});
    })
  }

  getSelectedProduct() {

  }

  onSubmit() {
    this.boxService.addProductToBox(this.boxId, this.addProductForm.value).subscribe(box => this.boxDetails=box.items);
  }

  removeProduct(productElementId: string) {
    this.boxService.removeProductFromBox(this.boxId, {productElementId})
      .subscribe(box => this.boxDetails=box.items);
  }
}
