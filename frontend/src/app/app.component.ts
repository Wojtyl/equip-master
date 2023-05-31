import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { UserService } from "./auth/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private http: HttpClient, private userService: UserService) {}



}
