import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { forkJoin, Subject } from "rxjs";
import { Product } from "../../../../../shared/models/productModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupplierService } from "../../../suppliers/supplier.service";
import { Supplier } from "../../../../../shared/models/supplierModel";
import { CategoryService } from "../../../../../shared/services/category.service";
import { ICategory } from "../../../../../shared/models/categoryModel";
import { ProductService } from "../../product.service";
import { ProductSize } from "../../../../../shared/models/productSizesModel";
import { OverlayPanel } from "primeng/overlaypanel";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @ViewChild('addImageInput') addImageInput: ElementRef<HTMLInputElement>;
  @Output() productFormData = new Subject<Product | null>();
  @Output() uploadFile = new Subject<File | null>();
  @Output() imageRemoved = new Subject<boolean>();
  @Input() product: Product;

  fb = inject(FormBuilder);
  suppliersService = inject(SupplierService);
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  cdr = inject(ChangeDetectorRef)

  productForm: FormGroup;
  productSizeForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  })

  productSizes: ProductSize[];
  suppliers: Supplier[];
  categories: ICategory[];
  imagePreview: string | undefined;

  ngOnInit() {
    forkJoin([this.suppliersService.getAllSuppliers(),
      this.categoryService.getCategories(),
      this.productService.getProductSizes()]).subscribe(
      ([suppliers, categories, productSizes]) => {
        this.suppliers = suppliers.items;
        this.categories = categories.items;
        this.productSizes = productSizes.items

        this.productForm = this.fb.group({
          name: [this.product?.name ?? '', Validators.required],
          productIndex: [this.product?.productIndex ?? '', Validators.required],
          supplierId: [this.product?.supplierId ?? '', Validators.required],
          attributes: this.fb.group({
            size: [this.product?.attributes?.size ?? '', Validators.required]
          }),
          category: [this.product?.category[0] ?? ''],
          description: [this.product?.description ?? '']
        })

        this.productForm.valueChanges.subscribe(() => {
          this.productForm.valid ? this.productFormData.next(this.productForm.getRawValue()) : this.productFormData.next(null);
        })

        this.cdr.detectChanges();
    });

    if (this.product) this.imagePreview = this.product.imageUrl;
    this.cdr.detectChanges()
  }

  @ViewChild('sizeOp') sizePanel: OverlayPanel;
  addProductSize() {
    this.productService.addProductSize(this.productSizeForm?.getRawValue()).subscribe(response => {
      this.sizePanel.hide();
      this.productSizeForm.reset();
      this.productSizes.push(response.items);
      const sizeForm = this.productForm.get('attributes.size');
      const newVal: string[] = sizeForm?.value;
      newVal.push(response.items.name)
      sizeForm?.patchValue(newVal)
      this.cdr.detectChanges()
    })
  }

  removeImage() {
    this.imagePreview = undefined;
    this.uploadFile.next(null);
    this.imageRemoved.next(true);
  }
}
