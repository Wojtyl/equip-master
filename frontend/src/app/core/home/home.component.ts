import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environments/apiurl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //TODO: Recent delivery-page to quickly navigate to last one
  //TODO: Delivery graph
  suppliers: any[] = [];

  user: any;

  invoiceForm: FormGroup;

  constructor(private userService: UserService, private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.userService.user.subscribe((user) => (this.user = user));
  }



  getSuppliers() {
    this.http
      .get<any>(`${apiUrl}suppliers`)
      .subscribe((sup) => {
        this.suppliers = sup.items;
      });
  }
}
