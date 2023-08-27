import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/apiurl';
import { ICategory } from '../models/categoryModel';

interface CategoryResponse {
  status: string,
  category: ICategory[],
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<CategoryResponse>(`${apiUrl}categories`);
  }
}
