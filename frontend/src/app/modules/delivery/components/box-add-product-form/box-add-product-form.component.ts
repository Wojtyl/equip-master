import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../../../shared/models/productModel";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { BoxService } from "../../../../shared/services/box.service";
import { IBoxDetails } from "../../models/box-model";

@Component({
  selector: 'app-box-add-product-form',
  templateUrl: './box-add-product-form.component.html',
  styleUrl: './box-add-product-form.component.scss'
})
export class BoxAddProductFormComponent implements OnInit{
  @Input() products: Product[];
  @Input() addProductForm: FormGroup;
  @Input() visible = false;
  @Input() boxId: string;
  @Output() boxDetailsUpdated = new Subject<IBoxDetails>();
  @Output() modalVisible = new Subject<boolean>();
  private boxService = inject(BoxService);
  protected selectedProduct: Product;

  ngOnInit() {
    this.addProductForm.get('productId')!.valueChanges.subscribe(val => {
      this.selectedProduct = this.products.find(prod => prod._id === val)!;
      this.addProductForm.patchValue({quantity: null, size: null});
    })
  }

  onSubmit() {
    this.boxService.addProductToBox(this.boxId, this.addProductForm.value).subscribe(box => {
      this.boxDetailsUpdated.next(box.items);
      this.closeModal();
    });
  }

  closeModal() {
    this.modalVisible.next(false)
    this.addProductForm.reset();
  }
}
