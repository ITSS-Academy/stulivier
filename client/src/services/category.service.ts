import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClientAuth) {}

  getAllCategories() {
    return this.http.get('categories/all');
  }

  getCategoryById(id: string) {
    return this.http.get(`categories`, { params: { id } });
  }

  getTopCategories() {
    return this.http.get('categories/top');
  }
}
