import { Injectable } from '@angular/core';
import { CategoryInterface } from '../common/interfaces/category-interface.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
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
  constructor(private http: HttpClient, private authservice : AuthService) {}
  categoryList: CategoryInterface[] = [];

  access_token = this.authservice.getToken();

  httpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.access_token}`,
  });

  getCategoryData() {
    return this.http.get(environment.baseURL + `category`,{ headers : this.httpHeaders});
  }

  getCategoryList(){
    return this.http.get(environment.baseURL + 'categorylist');
  }

  addCategory(data: any) {
    return this.http.post(environment.baseURL + `category`, data,{ headers : this.httpHeaders});
  }

  removeCategory(id: number) {
    return this.http.delete(environment.baseURL + `category` + '/' + id,{ headers : this.httpHeaders});
  }

  getSingleCategory(id: number) {
    return this.http.get(environment.baseURL + `category` + '/' + id,{ headers : this.httpHeaders});
  }

  editCategory(element: any) {
    return this.http.put(
      environment.baseURL + `category` + '/' + element.id,
      element,{ headers : this.httpHeaders}
    );
    // .map((response: Response) => response.json());
  }
}
