import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../../core/auth/user.service";

@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password-page.component.html',
  styleUrl: './new-password-page.component.scss'
})
export class NewPasswordPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private token: string;

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
  }
}
