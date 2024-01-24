import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/models/productModel';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  @Input() formGroup: FormGroup;
  @Input() products: Product[];
  @Output() onAddProduct = new EventEmitter();

  selectedProduct: Product | undefined;

  onSelect(event: any) {
    this.selectedProduct = event.value;
  }

  addProduct() {
    this.onAddProduct.emit();
    this.selectedProduct = undefined;
    this.formGroup.reset();
  }
}
