import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../../../suppliers/supplier.service';
import { ProductService } from '../../product.service';
import { Product } from 'src/app/shared/models/productModel';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/models/categoryModel';
import { Supplier } from "../../../../shared/models/supplierModel";

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.scss'],
})
export class ProductAddPageComponent implements OnInit {
  suppliers: Supplier[] = [];
  products: Product[] = [];
  categories: ICategory[] = [];

  productForm: FormGroup;

  productFormData: Product | null;
  uploadFile: File | null;

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.initForm();
    this.supplierService.getAllSuppliers().subscribe((resData) => {
      this.suppliers = resData.items;
    });

    this.productService.getAllProducts().subscribe(products => {
      this.products = products.items;
    })

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.items;
    })
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: null,
      supplierId: null,
      index: null,
      category: null,
      size: null,
      color: null
    });
  }

  onSubmit() {
    const formData = new FormData();

    if (this.uploadFile) formData.append('image', this.uploadFile);
    if (this.productFormData) formData.append('product', JSON.stringify(this.productFormData));

    this.productService.addProduct(formData).subscribe(() => window.alert('Product created successfully'));
  }
}
