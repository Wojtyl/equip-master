import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/assets/apiurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  suppliers: any[] = [];

  user: any;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.userService.user.subscribe((user) => (this.user = user));
  }

  getSuppliers() {
    this.http
      .get<any>(`${apiUrl}suppliers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .subscribe((sup) => {
        this.suppliers = sup.supplier;
      });
  }
}
