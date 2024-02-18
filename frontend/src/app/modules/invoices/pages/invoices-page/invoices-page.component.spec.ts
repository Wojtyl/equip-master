import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesPageComponent } from './invoices-page.component';

describe('InvoicePageComponent', () => {
  let component: InvoicesPageComponent;
  let fixture: ComponentFixture<InvoicesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesPageComponent]
    });
    fixture = TestBed.createComponent(InvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
