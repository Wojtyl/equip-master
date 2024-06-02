import { Component, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl, FormArray,
  UntypedFormBuilder, UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import { CustomAsyncValidators, CustomValidationErrors } from "../../../../../core/utils/async-vaildators";
import { Supplier } from "../../../../../shared/models/supplierModel";
import { SupplierService } from "../../../suppliers/supplier.service";
import { ValidationService } from "../../../../../shared/services/validation.service";
import { Product } from "../../../../../shared/models/productModel";
import { Invoice, InvoiceForm } from "../../models/invoice-model";
import { InvoiceProducts } from "../../../../../shared/models/invoiceProductsModel";
import { combineLatest, filter, Subject } from "rxjs";

export enum InvoiceFormFields {
  Supplier = 'supplier',
  InvoiceNumber = 'invoiceNumber',
  InvoiceDate = 'invoiceDate',
  NettoPrice = 'nettoPrice',
  Currency = 'currency',
  Products = 'products',
}

export enum AddProductFormFields {
  ProductId = 'productId',
  Size = 'size',
  Quantity = 'quantity',
  Price = 'price'
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoice: Invoice;
  @Output() invoiceFormData = new Subject<InvoiceForm | null>();
  @Output() isLoaded = new Subject<boolean>();

  @Input() isEditMode = false;
  isEditing = false;

  invoiceForm: UntypedFormGroup;
  suppliers: Supplier[];
  productsGroup: UntypedFormGroup;
  selectedSupplier: Supplier;
  invoiceTotalPrice = 0;
  isEditingControl = -1;
  editingFormGroup: UntypedFormGroup;
  productNameMap: { [key: string]: string }

  pageSizes = [1, 5, 10, 30, -1];
  totalPageCount = 1;
  maxPageElements = 5;
  currentPage = 1;
  controls: AbstractControl<any>[];

  protected readonly FormFields = InvoiceFormFields;
  protected readonly CustomValidationErrors = CustomValidationErrors;
  protected readonly AddProductFormFields = AddProductFormFields;


  constructor(private formBuilder: UntypedFormBuilder,
              private supplierService: SupplierService,
              private validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.supplierService.getAllSuppliers()
      .subscribe((response) => {
        this.suppliers = response.items;

        this.initForm();

        this.invoiceForm.get(InvoiceFormFields.Supplier)?.valueChanges.subscribe((supplier) => {
          this.selectedSupplier = this.suppliers.find(supp => supp._id === supplier)!;
          this.createProductNameMap(this.selectedSupplier.products);
        })

        this.invoiceForm.get(InvoiceFormFields.Products)?.valueChanges.subscribe(() => {
          this.setupPagination();
        })

        combineLatest([this.invoiceForm.statusChanges, this.invoiceForm.valueChanges]).pipe(
          filter(([status]) => this.invoiceForm.dirty && (status === 'VALID' || status === 'INVALID'))
        ).subscribe(([status]) => {
          status === 'VALID' ? this.invoiceFormData.next(this.getAllInvoiceValues()) : this.invoiceFormData.next(null)
        })
        this.isLoaded.next(false);
      })
  }

  private initForm() {
    this.invoiceForm = this.formBuilder.group({
      [InvoiceFormFields.Supplier]: [this.invoice?.supplier?._id ?? null, Validators.required],
      [InvoiceFormFields.InvoiceDate]: [this.timestampToFormatDate(this.invoice?.date), Validators.required],
      [InvoiceFormFields.InvoiceNumber]: [this.invoice?.invoiceNumber ?? null, Validators.required, [CustomAsyncValidators.uniqueInvoiceNumber(this.validationService, this.invoice?.invoiceNumber)]],
      [InvoiceFormFields.NettoPrice]: [this.invoice?.nettoPrice ?? null, Validators.required],
      [InvoiceFormFields.Products]: new FormArray([]),
      [InvoiceFormFields.Currency]: [this.invoice?.currency, Validators.required]
    });

    this.initAddProductForm();

    if (this.invoice) {
      this.selectedSupplier = this.suppliers.find(supp => supp._id === this.invoice?.supplier._id)!;
      this.createProductNameMap(this.selectedSupplier.products);
      this.invoice.products.forEach((product) => this.addProduct(product));
      this.setupPagination();
      this.invoiceForm.get(InvoiceFormFields.Supplier)?.disable()
    }
  }

  private createProductNameMap(products: Product[]) {
    this.productNameMap = products.reduce((arr, prod) => {
      return { ...arr, [prod._id]: prod.name }
    }, {})
  }

  public getControlErrors(controlName: InvoiceFormFields) {
    return this.invoiceForm.get(controlName)?.errors ?? {};
  }

  private setupPagination() {
    const elements = (this.invoiceForm.get(InvoiceFormFields.Products) as FormArray).controls;
    if (elements?.length > 0) {
      this.totalPageCount = Math.ceil(elements.length / this.maxPageElements);
    }
    this.paginateControls(this.currentPage);
  }

  private initAddProductForm() {
    this.productsGroup = this.formBuilder.group({
      [AddProductFormFields.ProductId]: null,
      [AddProductFormFields.Quantity]: null,
      [AddProductFormFields.Price]: null,
      [AddProductFormFields.Size]: null,
    });
  }

  public getProductsControlsRaw(): InvoiceProducts[] {
    return this.invoiceForm.get(InvoiceFormFields.Products)?.getRawValue();
  }

  public getCurrency() {
    return this.invoiceForm.get(InvoiceFormFields.Currency)?.value;
  }

  public addProduct(product?: InvoiceProducts) {
    const { price, quantity } = product ?? this.productsGroup.value;
    const control = new UntypedFormControl(product ?? this.productsGroup.value);
    this.invoiceTotalPrice += price * quantity;
    (<FormArray>this.invoiceForm.get(InvoiceFormFields.Products)).push(control);
  }

  private getAllInvoiceValues() {
    return {
      invoiceNumber: this.invoiceForm.get(InvoiceFormFields.InvoiceNumber)?.value,
      supplier: this.invoiceForm.get(InvoiceFormFields.Supplier)?.value,
      date: (<Date>this.invoiceForm.get(InvoiceFormFields.InvoiceDate)?.value)?.getTime(),
      nettoPrice: this.invoiceForm.get(InvoiceFormFields.NettoPrice)?.value,
      products: this.mapProducts(),
      currency: this.invoiceForm.get(InvoiceFormFields.Currency)?.value,
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

  deleteControl(i: number) {
    (<FormArray>this.invoiceForm.get(InvoiceFormFields.Products)).controls.splice(i, 1);
    this.paginateControls(this.currentPage);
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
    const elements = (this.invoiceForm.get(InvoiceFormFields.Products) as FormArray).controls;
    this.totalPageCount = Math.ceil(elements.length / this.maxPageElements);
    if (page > this.totalPageCount) {
      this.currentPage = this.totalPageCount;
    } else {
      this.currentPage = page;
    }
    if (this.maxPageElements === -1) {
      this.controls = elements;
    } else {
      this.controls = elements.slice((this.currentPage - 1) * this.maxPageElements, (this.currentPage - 1) * this.maxPageElements + this.maxPageElements);
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
    return this.invoiceForm.get(InvoiceFormFields.Products)?.value.map((prod) => {
      return {
        productId: prod.productId,
        quantity: prod.quantity,
        price: prod.price,
        size: prod.size
      };
    })
  }

  public getInvoiceTotalAmount() {
    return this.getProductsControlsRaw().reduce((a, b) => a + (b.quantity * b.price), 0)
  }

  private timestampToFormatDate(timestamp: number): Date | null {
    return this.invoice?.date ? new Date(timestamp) : null;
  }
}
