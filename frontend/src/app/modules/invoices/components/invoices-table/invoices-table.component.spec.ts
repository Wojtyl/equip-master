import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesTableComponent } from './invoices-table.component';

describe('InvoicesTableComponent', () => {
  let component: InvoicesTableComponent;
  let fixture: ComponentFixture<InvoicesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesTableComponent]
    });
    fixture = TestBed.createComponent(InvoicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
