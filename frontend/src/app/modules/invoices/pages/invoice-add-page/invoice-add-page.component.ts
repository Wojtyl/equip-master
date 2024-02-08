import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { InvoiceService } from '../../invoice.service';
import { SupplierService } from '../../../suppliers/supplier.service';
import { ProductService } from '../../../products/product.service';
import { Supplier } from 'src/app/shared/models/supplierModel';
import { CustomAsyncValidators, CustomValidationErrors } from "../../../../core/utils/async-vaildators";
import { ValidationService } from "../../../../shared/services/validation.service";
import { Product } from "../../../../shared/models/productModel";

export enum FormFields {
  Supplier = 'supplier',
  InvoiceNumber = 'invoiceNumber',
  InvoiceDate = 'invoiceDate',
  NettoPrice = 'nettoPrice',
  Currency = 'currency',
  Products = 'products',
}

interface InvoiceProduct {
  product: Product;
  quantity: number;
  price: number;
  size: string;
}

@Component({
  selector: 'app-invoice-add-page',
  templateUrl: './invoice-add-page.component.html',
  styleUrls: ['./invoice-add-page.component.scss'],
})
export class InvoiceAddPageComponent implements OnInit {
  invoiceForm: FormGroup;
  suppliers: any = null;
  productsGroup: FormGroup;
  selectedSupplier: Supplier;
  invoiceTotalPrice = 0;
  isEditingControl = -1;
  editingFormGroup: UntypedFormGroup;

  pageSizes = [1, 5, 10, 30, -1];
  totalPageCount = 1;
  maxPageElements = 5;
  currentPage = 1;
  controls: AbstractControl<any>[];

  protected readonly FormFields = FormFields;
  protected readonly CustomValidationErrors = CustomValidationErrors;

  constructor(private formBuilder: FormBuilder,
              private invoiceService: InvoiceService,
              private supplierService: SupplierService,
              private productService: ProductService,
              private validationService: ValidationService) { }

  ngOnInit(): void {
    this.initForm();
    this.initAddProductForm();
    this.supplierService.getAllSuppliers()
      .subscribe((suppliers) => {
        this.suppliers = suppliers.supplier;
      })

    this.invoiceForm.get('supplier')?.valueChanges.subscribe((supplier) => {
      this.selectedSupplier = supplier;
    })

    this.invoiceForm.get(FormFields.Products)?.valueChanges.subscribe(() => {
      this.setupPagination();
    })
  }

  private initForm() {
    this.invoiceForm = this.formBuilder.group({
      [FormFields.Supplier]: [null, Validators.required],
      [FormFields.InvoiceDate]: [null, Validators.required],
      [FormFields.InvoiceNumber]: [null, Validators.required, [CustomAsyncValidators.uniqueInvoiceNumber(this.validationService)]],
      [FormFields.NettoPrice]: [null, Validators.required],
      [FormFields.Products]: new FormArray([]),
      [FormFields.Currency]: [null, Validators.required]
    });
  }

  public checkFormValid() {
    return this.invoiceForm.touched && this.invoiceForm.valid;
  }

  public getControlErrors(controlName: FormFields) {
    return this.invoiceForm.get(controlName)?.errors ?? {};
  }

  private setupPagination() {
    const elements = (this.invoiceForm.get(FormFields.Products) as FormArray).controls;
    if (elements?.length > 0) {
      this.totalPageCount = Math.ceil(elements.length / this.maxPageElements);
    }
    this.paginateControls(this.currentPage);
  }

  private initAddProductForm() {
    this.productsGroup = this.formBuilder.group({
      product: null,
      quantity: null,
      price: null,
      size: null,
    });
  }

  public getProductsControlsRaw(): InvoiceProduct[] {
    return this.invoiceForm.get('products')?.getRawValue();
  }

  public addProduct() {
    const { price, quantity } = this.productsGroup.value;
    const control = new FormControl(this.productsGroup.value);
    this.invoiceTotalPrice += price * quantity;
    (<FormArray>this.invoiceForm.get('products')).push(control);
  }

  private getAllInvoiceValues() {
    return {
      invoiceNumber: this.invoiceForm.get('invoiceNumber')?.value,
      supplier: this.invoiceForm.get('supplier')?.value._id,
      date: this.invoiceForm.get('invoiceDate')!.value,
      nettoPrice: this.invoiceForm.get('nettoPrice')?.value,
      products: this.mapProducts(),
      currency: 'PLN'
    };
  }

  public editControl(i: number) {
    const { quantity, price } = this.controls[i].getRawValue();
    this.editingFormGroup = this.formBuilder.group({
      quantity,
      price
    })
    this.isEditingControl = i;
  }

  public updateControl(i: number) {
    const oldValues = this.controls[i].getRawValue();
    const { quantity: newQ, price: newP } = this.editingFormGroup.getRawValue();
    this.invoiceTotalPrice += (newQ * newP) - (oldValues.quantity * oldValues.price);
    this.controls[i].patchValue({
      ...oldValues,
      price: newP,
      quantity: newQ
    })
    this.isEditingControl = -1;
  }

  public cancelEdit() {
    this.isEditingControl = -1;
  }

  public paginateControls(page: number) {
    const elements = (this.invoiceForm.get(FormFields.Products) as FormArray).controls;
    this.currentPage = page;
    this.totalPageCount = Math.ceil(elements.length / this.maxPageElements);
    if (this.maxPageElements === -1) {
      this.controls = elements;
    } else {
      this.controls = elements.slice((page - 1) * this.maxPageElements, (page - 1) * this.maxPageElements + this.maxPageElements);
    }
  }

  public changePaginationSize(size: number) {
    this.maxPageElements = size;
    this.paginateControls(this.currentPage);
  }

  public getPageCount() {
    if (this.maxPageElements === -1) {
      return []
    } else {
      return new Array(this.totalPageCount);
    }
  }

  private mapProducts() {
    return this.invoiceForm.get('products')?.value.map((prod) => {
      return {
        productId: prod.product._id,
        quantity: prod.quantity,
        price: prod.price,
        size: prod.size
      };
    })
  }

  public getInvoiceTotalAmount() {
    return this.getProductsControlsRaw().reduce((a, b) => a + (b.quantity * b.price), 0)
  }

  public onSubmit() {
    this.invoiceService.addInvoice(this.getAllInvoiceValues()).subscribe();
  }
}
