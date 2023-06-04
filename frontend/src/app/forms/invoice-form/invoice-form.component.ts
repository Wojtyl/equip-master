import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { invoiceProducts } from 'src/app/models/invoiceProductsModel';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;

  isAdding = false;

  products: FormGroup;

  constructor(private formBuilder: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.invoiceForm = this.formBuilder.group({
      supplier: ['6471f804717a2af5865e3c8e', Validators.required],
      invoiceDate: [null, Validators.required],
      invoiceNumber: [null, Validators.required],
      nettoPrice: [null, Validators.required],
      products: new FormArray([]),
    });
  }

  onSubmit() {
    const values = this.getAllInvoiceValues();
    this.invoiceService.addInvoice(values).subscribe((res) => console.log(res));
  }

  addProductsFormInit() {
    this.isAdding = true;
    this.products = this.formBuilder.group<invoiceProducts>({
      productName: 'Product 1',
      quantity: 1,
      price: 2,
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
      supplierId: '6471f804717a2af5865e3c8e',
      date: this.invoiceForm.get('invoiceDate')!.value,
      nettoPrice: this.invoiceForm.get('nettoPrice')?.value,
      products: this.invoiceForm.get('products')!.value,
    };
  }
}
