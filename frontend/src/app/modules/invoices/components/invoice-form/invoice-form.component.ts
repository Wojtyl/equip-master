import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from "../../models/invoice-model";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  @Input() invoice: Invoice;
  protected invoiceForm: UntypedFormGroup;


  constructor(
    private fb: UntypedFormBuilder) {
  }

  ngOnInit() {
    this.setupForm();
  }


  private setupForm() {
    this.invoiceForm = this.fb.group({
      supplier: [this.invoice.supplier._id],
      invoiceNumber: [this.invoice.invoiceNumber],
      date: [this.invoice.date],
      currency: [this.invoice.currency],
    })

    this.invoiceForm.disable()
  }
}
