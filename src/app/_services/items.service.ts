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

  uploadImage(formData: any){
    return this.http.post(environment.baseURL + `upload-image`, formData, { headers : this.httpHeaders});
  }

  removeImage(formData: any){
    return this.http.delete(environment.baseURL + `upload-image/${formData}`, { headers : this.httpHeaders});
  }

  getItemData() {
    return this.http.get(environment.baseURL + `item`,{ headers : this.httpHeaders});
  }

  addItem(data: any):Observable<any> {
    return this.http.post(environment.baseURL + `item`, data,{ headers : this.httpHeaders});
  }

  addItemList(data: any) {
    return this.http.put(environment.baseURL + `item`, data,{ headers : this.httpHeaders});
  }

  removeItem(id : number) {
    return this.http.delete(environment.baseURL + `item/` + id,{ headers : this.httpHeaders});
  }

  removeItemById(id: any) {
    return this.http.delete(environment.baseURL + `item`,{ headers : this.httpHeaders});
  }

  editItem(element: any) {
    return this.http.put(
      environment.baseURL + `item` + '/' + element.id,
      element
    );
  }
  data: any;
}
