import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { invoiceProducts } from 'src/app/models/invoiceProductsModel';
import { SupplierService } from '../supplier-form/supplier.service';
import { ProductService } from '../product-form/product.service';
import { Supplier } from 'src/app/models/supplierModel';
import { Product } from 'src/app/models/productModel';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;

  suppliers: any = null;

  isAdding = false;

  products: FormGroup;

  selectedSupplier: Supplier;

  invoices: any[];

  constructor(private formBuilder: FormBuilder, private invoiceService: InvoiceService, private supplierService: SupplierService, private productService: ProductService) {}

  ngOnInit(): void {
    this.initForm();
    this.supplierService.getAllSuppliers().subscribe(suppliers => this.suppliers = suppliers.supplier);
    this.invoiceService.getAllInvoices().subscribe((resData) => {
      this.invoices = resData.invoice;
    });

    this.invoiceForm.get('supplier')?.valueChanges.subscribe((supp) => {
      this.selectedSupplier = supp;
    })
  }
  initForm() {
    this.invoiceForm = this.formBuilder.group({
      supplier: [null, Validators.required],
      invoiceDate: [null, Validators.required],
      invoiceNumber: [null, Validators.required],
      nettoPrice: [null, Validators.required],
      products: new FormArray([]),
    });
  }

  onSubmit() {
    const values = this.getAllInvoiceValues();
    values.products.forEach((_, i) => values.products[i].product = values.products[i].product._id);
    this.invoiceService.addInvoice(values).subscribe((res) => console.log(res));
  }

  addProductsFormInit() {
    if(this.isAdding === false){
      this.initAddProductForm();
    } else {
      this.isAdding = false;
    }
  }

  initAddProductForm() {
    this.isAdding = true;
      this.products = this.formBuilder.group({
        product: null,
        quantity: null,
        price: null,
        size: null
      });
  }


  getProductsControls() {
    return (<FormArray>this.invoiceForm.get('products')).controls;
  }

  addProduct() {
    const control = new FormControl(this.products.value);
    (<FormArray>this.invoiceForm.get('products')).push(control);
  }

  getAllInvoiceValues() {
    return {
      invoiceNumber: this.invoiceForm.get('invoiceNumber')?.value,
      supplierId: this.invoiceForm.get('supplier')?.value._id,
      date: this.invoiceForm.get('invoiceDate')!.value,
      nettoPrice: this.invoiceForm.get('nettoPrice')?.value,
      products: this.invoiceForm.get('products')!.value,
    };
  }
}
