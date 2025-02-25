import { Injectable } from '@angular/core';
import { CategoryInterface } from '../common/interfaces/category-interface.data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  constructor(private http: HttpClient) {}
  categoryList: CategoryInterface[] = [];

  getCategoryList() {
    return this.http.get(environment.baseURL + `categories`);
  }

  addCategory(data: any){


    return this.http.post(environment.baseURL + `categories`,data)
  }
}
