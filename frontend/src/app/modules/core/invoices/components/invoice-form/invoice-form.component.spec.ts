import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormComponent } from './invoice-form.component';

describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceFormComponent]
    });
    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
