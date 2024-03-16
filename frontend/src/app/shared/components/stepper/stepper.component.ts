import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from "../../services/stepper.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit, OnDestroy {
  private stepService = inject(StepperService);
  private subscription = new Subscription();
  protected currentStep: number = 0;

  ngOnInit() {
    this.subscription = this.stepService.currentStep$.subscribe(step => this.currentStep = step);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
