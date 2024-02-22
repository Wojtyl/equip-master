import { Component, ElementRef, inject, OnInit, Output, ViewChild } from '@angular/core';
import { forkJoin, Subject } from "rxjs";
import { Product } from "../../../../shared/models/productModel";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupplierService } from "../../../suppliers/supplier.service";
import { Supplier } from "../../../../shared/models/supplierModel";
import { CategoryService } from "../../../../shared/services/category.service";
import { ICategory } from "../../../../shared/models/categoryModel";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @ViewChild('addImageInput') addImageInput: ElementRef<HTMLInputElement>;
  @Output() productFormData = new Subject<Product | null>();
  @Output() uploadFile = new Subject<File>();

  fb = inject(FormBuilder);
  suppliersService = inject(SupplierService);
  categoryService = inject(CategoryService);
  productForm: FormGroup;
  sizes = [{name: 'S'}, {name: 'M'}, { name: "L"}]
  suppliers: Supplier[];
  categories: ICategory[];
  previewImage: string | ArrayBuffer | null;
  uploadedImages: string[] = [];

  ngOnInit() {
    forkJoin([this.suppliersService.getAllSuppliers(), this.categoryService.getCategories()]).subscribe(
      ([suppliers, categories]) => {
        this.suppliers = suppliers.items;
        this.categories = categories.items;

        this.productForm = this.fb.group({
          name: ['', Validators.required],
          productIndex: ['', Validators.required],
          supplier: ['', Validators.required],
          attributes: this.fb.group({
            size: ['', Validators.required]
          }),
          category: [''],
          description: ['']
        })

        this.productForm.valueChanges.subscribe(() => {
          this.productForm.valid ? this.productFormData.next(this.productForm.getRawValue()) : this.productFormData.next(null);
        })
    });
  }

  onImageAdded() {
    const fileReader = new FileReader();
    const files = this.addImageInput.nativeElement.files
    fileReader.onload = (e) => {
      this.uploadedImages?.push(e.target!.result as string);
    }

    if (files) {
      this.uploadFile.next(files[0])
      fileReader.readAsDataURL(files[0]);
    }
  }
}
