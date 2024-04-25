import { Component, inject, OnInit } from '@angular/core';
import { DeliverySummary, ProductSizes } from "../../models/delivery-summary";
import { DeliveryService } from "../../delivery-service.service";
import { ActivatedRoute } from "@angular/router";
import { StepperService } from "../../../../../shared/services/stepper.service";

@Component({
  selector: 'app-delivery-summary-step',
  templateUrl: './delivery-summary-step.component.html',
  styleUrl: './delivery-summary-step.component.scss'
})
export class DeliverySummaryStepComponent implements OnInit {
  private deliveryId: string;
  private stepperService = inject(StepperService);
  protected deliverySummary: DeliverySummary[];
  protected openedDetailsRow: number | null;
  constructor(private deliveryService: DeliveryService, private route: ActivatedRoute) {}


  ngOnInit() {
    this.stepperService.setStep(3);
    this.deliveryId = this.route.snapshot.params['id'];
    this.deliveryService.getDeliverySummary(this.deliveryId).subscribe(summary => {
      this.deliverySummary = summary.items;
    })
  }

  protected checkProductSizesDifference(sizes: ProductSizes[]): number | null{
    return this.getAllProductSizesQuantity(sizes) - this.getAllInvoiceProductSizesQuantity(sizes);
  }

  protected getAllProductSizesQuantity(sizes: ProductSizes[]) {
    return sizes.reduce((acc, size ) => acc + size.deliveryCount , 0);
  }

  private getAllInvoiceProductSizesQuantity(sizes: ProductSizes[]) {
    return sizes.reduce((acc, size ) => acc + size.deliveryCount - size.differenceCount, 0);
  }

  protected openDetails(i: number) {
    this.openedDetailsRow = i;
  }

  protected readonly Math = Math;
}
