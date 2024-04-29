import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsPageComponent } from './invoice-details-page.component';

describe('InvoiceDetailsPageComponent', () => {
  let component: InvoiceDetailsPageComponent;
  let fixture: ComponentFixture<InvoiceDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceDetailsPageComponent]
    });
    fixture = TestBed.createComponent(InvoiceDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
