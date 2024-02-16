import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupplierService } from "../../supplier.service";
import { combineLatest, filter, Subject, tap } from "rxjs";
import { Supplier } from "../../../../shared/models/supplierModel";
import { CustomAsyncValidators, CustomValidationErrors } from "../../../../core/utils/async-vaildators";
import { ValidationService } from "../../../../shared/services/validation.service";

export enum SupplierFormFields {
  Name = 'name',
  TaxID = 'taxIdNum',
  Description = 'description',
  ProductColors = 'productColors',
  Address = 'address',
  ContactPerson = 'contact',
  Phone = 'phoneNumber',
  Email = 'email',
  Website = 'website'
}

export enum AddressFormFields {
  Street = 'street',
  City = 'city',
  PostalCode = 'postalCode',
  State = 'state',
  Country = 'country'
}

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent implements OnInit {

  @Input() supplier: Supplier;
  @Output() supplierFormData = new Subject<Supplier | null>();
  supplierForm: FormGroup;
  formBuilder = inject(FormBuilder);
  supplierService = inject(SupplierService);
  validationService = inject(ValidationService);

  ngOnInit() {
    this.initForm();

    combineLatest([this.supplierForm.statusChanges, this.supplierForm.valueChanges]).pipe(
      filter(([status]) => this.supplierForm.dirty && (status === 'VALID' || status === 'INVALID')),
    ).subscribe(([status]) => {
      status === 'VALID' ? this.supplierFormData.next(this.supplierForm.getRawValue()) : this.supplierFormData.next(null)
    })
  }

  initForm(): void {
    this.supplierForm = this.formBuilder.group({
      [SupplierFormFields.Name]: [this.supplier?.name ?? '', [Validators.required]],
      [SupplierFormFields.TaxID]: [this.supplier?.taxIdNum ?? '', [Validators.required], [CustomAsyncValidators.uniqueSupplierVatId(this.validationService, this.supplier?.taxIdNum)]],
      [SupplierFormFields.ContactPerson]: [this.supplier?.contact ?? '', []],
      [SupplierFormFields.Email]: [this.supplier?.email ?? '', [Validators.required]],
      [SupplierFormFields.Phone]: [this.supplier?.phoneNumber ?? '', []],
      [SupplierFormFields.Website]: [this.supplier?.website ?? '', []],
      [SupplierFormFields.Description]: [this.supplier?.descrption ?? '', []],
      [SupplierFormFields.Address]: this.formBuilder.group({
        [AddressFormFields.Street]: [this.supplier?.address.street ?? '', [Validators.required]],
        [AddressFormFields.City]: [this.supplier?.address.city ?? '', [Validators.required]],
        [AddressFormFields.PostalCode]: [this.supplier?.address.postalCode ?? '', [Validators.required]],
        [AddressFormFields.State]: [this.supplier?.address.state ?? '', [Validators.required]],
        [AddressFormFields.Country]: [this.supplier?.address.country ?? '', [Validators.required]],
      }),
      [SupplierFormFields.ProductColors]: [this.supplier?.productColors ?? []]
    });
  }

  getAddressFormGroup(): FormGroup {
    return this.supplierForm.get(SupplierFormFields.Address) as FormGroup;
  }

  getProductColours(): string[] {
    return this.supplierForm.get(SupplierFormFields.ProductColors)?.value;
  }

  public getControlErrors(controlName: SupplierFormFields) {
    return this.supplierForm.get(controlName)?.errors ?? {};
  }

  addColor(colourValue: HTMLInputElement) {
    this.supplierForm.get(SupplierFormFields.ProductColors)?.markAsDirty();

    const newValues = this.getProductColours();
    newValues.push(colourValue.value);
    this.supplierForm.get(SupplierFormFields.ProductColors)?.patchValue(newValues);
    colourValue.value = '';
  }

  removeColour(e: string) {
    const newValues = this.getProductColours();
    const removedIdx = newValues.indexOf(e);
    this.supplierForm.get(SupplierFormFields.ProductColors)?.markAsDirty();

    if (removedIdx !== -1) {
      newValues.splice(removedIdx, 1);
      this.supplierForm.get(SupplierFormFields.ProductColors)?.patchValue(newValues);
    }
  }

  protected readonly FormFields = SupplierFormFields;
  protected readonly AddressFormFields = AddressFormFields;
  protected readonly CustomValidationErrors = CustomValidationErrors;
}
