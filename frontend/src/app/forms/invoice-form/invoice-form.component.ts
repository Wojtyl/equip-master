import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;

  isAdding = false;

  items: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.invoiceForm = this.formBuilder.group({
      supplier: [null, Validators.required],
      invoiceDate: [null, Validators.required],
      invoiceNumber: [null, Validators.required],
      nettoPrice: [null, Validators.required],
      items: new FormArray([])
    });
  }

  onSubmit(){
    console.log(this.invoiceForm.value)
    console.log((<FormArray>this.invoiceForm.get('items')).controls)
  }

  addItemsFormInit(){
    this.isAdding = true;
    this.items = this.formBuilder.group({
      itemId: '123',
      quantity: 1,
      price: 2
    })
  }

  getItems(){
    return (<FormArray>this.invoiceForm.get('items')).controls;
  }

  consoleMe(item: any){
    console.log(item);
  }

  addItems() {
    const control = new FormControl(this.items.value);
    (<FormArray>this.invoiceForm.get('items')).push(control)
  }
}
