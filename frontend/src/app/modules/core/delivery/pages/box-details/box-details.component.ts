import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BoxService } from "../../../../../shared/services/box.service";
import { IBoxDetails } from "../../models/box-model";
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Product } from "../../../../../shared/models/productModel";
import { ProductService } from "../../../products/product.service";
import { Subscription } from "rxjs";
import { BoxStatus } from "../../../../../shared/enums/box-status-enum";

export interface BoxProductForm {
  productId: string;
  size: string;
  quantity: number;
}
@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent implements  OnInit {

  constructor(private route: ActivatedRoute,
              private boxService: BoxService,
              private productService: ProductService,
              private formBuilder: UntypedFormBuilder) {}
  boxId: string;
  boxDetails: IBoxDetails;
  addProductForm: UntypedFormGroup;
  productsForm: UntypedFormGroup;
  products: Product[];
  visible = false;
  isEditing = -1;
  editingBoxProduct: BoxProductForm | undefined;
  editingProductSizes: string[];
  editingProductSubscription: Subscription

  private get getProductsArray() {
    return this.productsForm.get('products') as FormArray;
  }

  ngOnInit() {
    this.boxId = this.route.snapshot.params['id'];
    this.boxService.getBoxDetails(this.boxId).subscribe(box => {
      this.boxDetails = box.items;
      this.initProductsForm();
    });
    this.productService.getDeliveryProductsByBox(this.boxId).subscribe(products => {
      this.products = products.items;

    });
    this.addProductForm = this.formBuilder.group({
      productId: [null],
      quantity: [null],
      size: [null]
    })
  }

  initProductsForm() {
    this.productsForm = this.formBuilder.group({
      products: this.formBuilder.array([]) });

    this.boxDetails.products.forEach(product => this.getProductsArray.push(this.formBuilder.group({
      productId : [product.productId],
      productIndex: [product.productIndex],
      size: [product.size],
      quantity: [product.quantity]
    })))
  }

  showDialog() {
    this.visible = true;
  }

  removeProduct(productElementId: string) {
    this.boxService.removeProductFromBox(this.boxId, productElementId)
      .subscribe(box => this.boxDetails = box.items);
  }

  closeBox() {
    this.boxService.closeBox(this.boxId).subscribe(box => this.boxDetails = box.items);
  }

  openBox() {
    this.boxService.openBox(this.boxId).subscribe(box => this.boxDetails = box.items)
  }

  editProduct(index: number) {
    this.editingBoxProduct = this.getProductsArray.get(index.toString())?.getRawValue();
    this.getProductsArray.get(index.toString())?.get('productIndex')!.disable()
    this.setupEditingProductSizes(this.editingBoxProduct!.productId);
    this.editingProductSubscription = this.getProductsArray.get(index.toString())!.get('productId')!.valueChanges
      .subscribe(productId => {
        this.setupEditingProductSizes(productId);
        const selectedSize = this.getProductsArray.get(index.toString())?.get('size')?.value;
        const existingProductSize = this.editingProductSizes.some(size => size?.toLowerCase() === selectedSize?.toLowerCase());
        if (!existingProductSize) {
          this.getProductsArray.get(index.toString())?.get('size')?.patchValue(this.editingProductSizes[0]);
        }
        const product = this.products.find(prod => prod._id === productId)?.productIndex;
        this.getProductsArray.get(index.toString())
          ?.get('productIndex')!
          .patchValue(product)
      })
    this.isEditing = index;
  }

  cancelEdit(index: number) {
    this.getProductsArray.get(index.toString())?.patchValue(this.editingBoxProduct);
    this.isEditing = -1;
    this.editingProductSubscription.unsubscribe();
    this.editingBoxProduct = undefined;
  }

  getProductArrayFormControl(i: number, control: string) {
    const arrayControl = this.getProductsArray.get(i.toString())?.get(control);
    return arrayControl as FormControl;
  }

  updateProduct(i: number) {
    const productElementId = this.boxDetails.products[i]._id;
    const formData: BoxProductForm = this.getProductsArray.get(i.toString())!.getRawValue();
    this.boxService.editProductInBox(this.boxId, productElementId, formData)
      .subscribe(data => {
        this.boxDetails.products = data.items.products;
        this.editingBoxProduct = { ...data.items.products[i] }
        this.cancelEdit(i)
      });
  }

  setupEditingProductSizes(productId: string) {
    this.editingProductSizes = this.products.find(product => product._id === productId)?.attributes!.size as string[];
  }

  protected readonly BoxStatus = BoxStatus;
}
