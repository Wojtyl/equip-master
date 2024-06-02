import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { trigger } from "@angular/animations";
import { fadeInOutAnimation } from "src/app/core/animations/animation";

@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrl: './new-password-page.component.scss',
  animations: [
    trigger('fadeInOut', fadeInOutAnimation())
  ]
})
export class NewPasswordPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private token: string;
  protected passwordReset = false;

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
  }
}
