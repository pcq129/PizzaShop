import { Injectable } from '@angular/core';
import { Items } from '../common/interfaces/items-interface.data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
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

  addFavourite(itemId : number){
    return this.http.get(environment.baseURL + `item/add-favourite/${itemId}`);
  }

  searchItem(item : string, category: number){

    const params = {
      categoryId : category,
      item : item
    }
    return this.http.get(environment.baseURL + `items/orderapp/search`, {params})
  }

  getFavouriteItems(){
    return this.http.get(environment.baseURL + `items/favourites`);
  }
  uploadImage(formData: any){
    return this.http.post(environment.baseURL + `upload-image`, formData, { headers : this.httpHeaders});
  }

  removeImage(formData: any){
    return this.http.delete(environment.baseURL + `upload-image/${formData}`, { headers : this.httpHeaders});
  }

  getItemData() {
    return this.http.get(environment.baseURL + `item`,{ headers : this.httpHeaders});
  }

  getSingleItem(id: any) {
    return this.http.get(environment.baseURL + `item/${id}`,{ headers : this.httpHeaders});
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


  getItemByCategory(categoryId: number, params? :any){

    if(!params){
      params = {
        page : 1,
        perPage: 5
      }
    }
    return this.http.get(
      environment.baseURL + `category-items/${categoryId}`, {
        params: params
      }
    );
  }


  search(item : string, pageChange?: any){

    const params = {
      'page': pageChange?.pageIndex+1 || 1,
      'perPage' : pageChange?.pageSize || 5
    }
    return this.http.get(environment.baseURL + `item/search/${item}`, {params});
  }
}
