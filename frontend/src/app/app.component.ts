import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title = 'equip-master';

  suppliers: any[] = [];

  ngOnInit(): void {
    this.http.get<any>(`${apiUrl}suppliers`).subscribe((sup) => {
      console.log(sup.supplier);
      this.suppliers = sup.supplier;
    });
  }
}
