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
  getCategoryName(id: any) {
    return this.http.get(environment.baseURL + `categories` + '/' + id);
  }
  constructor(private http: HttpClient) {}
  categoryList: CategoryInterface[] = [];

  getCategoryList() {
    return this.http.get(environment.baseURL + `category`);
  }

  addCategory(data: any) {
    return this.http.post(environment.baseURL + `category`, data);
  }

  removeCategory(id: number) {
    return this.http.delete(environment.baseURL + `category` + '/' + id);
  }

  getSingleCategory(id: number) {
    return this.http.get(environment.baseURL + `category` + '/' + id);
  }

  editCategory(element: any) {
    return this.http.put(
      environment.baseURL + `category` + '/' + element.id,
      element
    );
    // .map((response: Response) => response.json());
  }
}
