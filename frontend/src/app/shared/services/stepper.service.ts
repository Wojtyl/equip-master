import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private currentStep = 0;
  public currentStep$ = new Subject<number>();
  constructor() { }

  setStep(step: number) {
    this.currentStep = step;
    this.currentStep$.next(step);
  }

  getStep() {
    return this.currentStep;
  }
}
