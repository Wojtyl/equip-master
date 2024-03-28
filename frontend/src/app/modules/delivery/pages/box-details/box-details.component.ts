import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BoxService } from "../../../../shared/services/box.service";
import { IBoxDetails } from "../../models/box-model";
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Product } from "../../../../shared/models/productModel";
import { ProductService } from "../../../products/product.service";
import { Subscription } from "rxjs";

interface BoxProductForm {
  productId: string;
  productSize: string;
  productQuantity: string;
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
  selectedProduct: Product;
  visible = false;
  isEditing = -1;
  editingBoxProduct: BoxProductForm | undefined;
  editingProductSub: Subscription
  editingProductSizes: string[];

  private get getProductsArray() {
    return this.productsForm.get('products') as FormArray;
  }

  ngOnInit() {
    this.boxId = this.route.snapshot.params['id'];
    this.boxService.getBoxDetails(this.boxId).subscribe(box => {
      this.boxDetails = box.items;
      this.initProductsForm();
      console.log(this.productsForm)
    });
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
      this.addProductForm.patchValue({quantity: null, size: null});
    })
  }

  initProductsForm() {
    this.productsForm = this.formBuilder.group({
      products: this.formBuilder.array([]) });

    this.boxDetails.products.forEach(product => this.getProductsArray.push(this.formBuilder.group({
      productId : [product.productId],
      productSize: [product.size],
      productQuantity: [product.quantity]
    })))
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    this.boxService.addProductToBox(this.boxId, this.addProductForm.value).subscribe(box => {
      this.boxDetails = box.items;
      this.visible = false;
      this.addProductForm.reset();
    });
  }

  removeProduct(productElementId: string) {
    this.boxService.removeProductFromBox(this.boxId, {productElementId})
      .subscribe(box => this.boxDetails=box.items);
  }

  closeBox() {
    this.boxService.closeBox(this.boxId).subscribe(box => this.boxDetails = box.items);
  }

  openBox() {
    this.boxService.openBox(this.boxId).subscribe(box => this.boxDetails = box.items)
  }

  editProduct(index: number) {
    this.editingBoxProduct = this.getProductsArray.get(index.toString())?.getRawValue();
    this.setupEditingProductSizes(this.editingBoxProduct!.productId);
    this.editingProductSub = this.getProductsArray.get(index.toString())!.get('productId')!.valueChanges.subscribe(productId => this.setupEditingProductSizes(productId))
    this.isEditing = index;
  }

  cancelEdit(index: number) {
    this.isEditing = -1;
    this.getProductsArray.get(index.toString())?.patchValue(this.editingBoxProduct);
    this.editingProductSub.unsubscribe();
    this.editingBoxProduct = undefined;
  }

  getProductArrayFormControl(i: number, control: string) {
    const arrayControl = this.getProductsArray.get(i.toString())?.get(control);
    return arrayControl as FormControl;
  }

  updateProduct(i: number) {


  }

  setupEditingProductSizes(productId: string) {
    this.editingProductSizes = this.products.find(product => product._id === productId)?.attributes!.size as string[];
  }
}
