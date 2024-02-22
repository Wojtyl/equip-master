import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/apiurl';
import { ICategory } from '../models/categoryModel';
import { ListResponse } from "../models/list-response";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ListResponse<ICategory[]>>(`${apiUrl}categories`);
  }
}
