import { Injectable } from '@angular/core';
import { CategoryInterface } from 'src/app/shared/interfaces/category-interface.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
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
  constructor(private http: HttpClient, private authservice: AuthService) {}
  categoryList: CategoryInterface[] = [];

  access_token = this.authservice.getToken();

  getCategoryData() {
    return this.http.get(environment.baseURL + `category`);
  }

  getCategoryList() {
    return this.http.get(environment.baseURL + 'categorylist');
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
      element);
    // .map((response: Response) => response.json());
  }
}
