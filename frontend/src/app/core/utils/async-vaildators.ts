import { Injectable } from "@angular/core";
import { iif, map, mergeMapTo, of, timer } from "rxjs";
import { AsyncValidatorFn } from "@angular/forms";
import { ValidationService } from "../../shared/services/validation.service";

export enum CustomValidationErrors {
  InvoiceNumberNotUnique = 'invoiceNumberNotUnique',
  SupplierVatIdNotUnique = 'supplierVatIdNotUnique'
}

@Injectable({providedIn: 'root'})
export class CustomAsyncValidators {
  static uniqueInvoiceNumber(validationService: ValidationService, currentNumber?: string): AsyncValidatorFn {
    return control => timer(400).pipe(
      mergeMapTo(
        iif(
          () => currentNumber?.trim() === control.value.trim(),
          of(true),
          validationService.validateInvoiceNumber(control.value),
        ).pipe(
          map(isUnique => isUnique ? null : { [CustomValidationErrors.InvoiceNumberNotUnique]: true }),
        ),
      ),
    );
  }

  static uniqueSupplierVatId(validationService: ValidationService, currentNumber?: number): AsyncValidatorFn {
    return control => timer(400).pipe(
      mergeMapTo(
        iif(
          () => {
            return currentNumber === +control.value
          },
          of(true),
          validationService.validateSupplierVatID(control.value),
        ).pipe(
          map(isUnique => isUnique ? null : { [CustomValidationErrors.SupplierVatIdNotUnique]: true }),
        ),
      ),
    );
  }
}
