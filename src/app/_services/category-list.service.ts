import { Injectable } from '@angular/core';
import { CategoryInterface } from '../common/interfaces/category-interface.data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  constructor(private http: HttpClient) {}
  categoryList: CategoryInterface[] = [];

  getCategoryList() {
    return this.http.get(environment.baseURL + `categories`);
  }

  addCategory(data: any) {
    return this.http.post(environment.baseURL + `categories`, data);
  }

  removeCategory(id: number) {
    return this.http.delete(environment.baseURL + `categories` + '/' + id);
  }

  editCategory(element: any) {
    return this.http.put(
      environment.baseURL + `categories` + '/' + element.id,
      element
    );
    // .map((response: Response) => response.json());
  }
}
