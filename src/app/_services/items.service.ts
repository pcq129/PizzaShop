import { Injectable } from '@angular/core';
import { Items } from '../common/interfaces/items-interface.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient, private authservice : AuthService) {}
  itemList: Items[] = [];

  access_token = this.authservice.getToken();

  httpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.access_token}`,
  });

  getItemList() {
    return this.http.get(environment.baseURL + `items`,{ headers : this.httpHeaders});
  }

  addItem(data: any):Observable<any> {
    return this.http.post(environment.baseURL + `items`, data,{ headers : this.httpHeaders});
  }

  addItemList(data: any) {
    return this.http.put(environment.baseURL + `items`, data,{ headers : this.httpHeaders});
  }

  removeItem(id : number) {
    return this.http.delete(environment.baseURL + `items/` + id,{ headers : this.httpHeaders});
  }

  removeItemById(id: any) {
    return this.http.delete(environment.baseURL + `items`,{ headers : this.httpHeaders});
  }

  editItem(element: any) {
    return this.http.put(
      environment.baseURL + `items` + '/' + element.id,
      element
    );
  }
  data: any;
}
