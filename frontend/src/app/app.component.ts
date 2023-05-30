import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { apiUrl } from "src/assets/apiurl";
import { UserService } from "./auth/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterContentInit {
  constructor(private http: HttpClient, private userService: UserService) {}

  title = "equip-master";

  suppliers: any[] = [];

  ngOnInit(): void {
    this.userService.isLoggedIn();
  }

  ngAfterContentInit(): void {
    this.http
      .get<any>(`${apiUrl}suppliers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("bearer")}` },
      })
      .subscribe((sup) => {
        console.log(sup.supplier);
        this.suppliers = sup.supplier;
      });
  }
}
