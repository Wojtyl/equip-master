import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  productForm: FormGroup;

  suppliers: Supplier[] = [];

  products: Product[] = [];

  selectedSupplier: Supplier;

  filteredSuppliers: any[];

  productColors: any;

  categories: ICategory[] = []

  productFormData: Product | null;

  uploadFile: File;

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

  get categoriesArray(): FormArray {
    return this.productForm.get('category') as FormArray;
  }

  newCategory(): FormGroup {
    return this.formBuilder.group({
      categories: ''
    })
  }

  addCategory() {
    this.categoriesArray.push(this.newCategory());
  }

  findSuppliers(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.suppliers.length; i++) {
      const supplier = this.suppliers[i];
      if (supplier.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(supplier);
      }
    }
    this.filteredSuppliers = filtered;
  }

  onSelect(event: any) {
    this.selectedSupplier = event;
    this.productColors = this.selectedSupplier.productColors.map(el => {return {name: el}});
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('image', this.uploadFile)
    formData.append('product', JSON.stringify(this.productFormData));

    this.productService.addProduct(formData).subscribe(() => window.alert('Product created successfully'));
  }
}
