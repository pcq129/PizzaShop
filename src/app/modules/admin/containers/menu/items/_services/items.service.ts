import { Injectable } from '@angular/core';
import { Items } from 'src/app/shared/interfaces/items-interface.data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(
    private http: HttpClient,
    private authservice: AuthService,
  ) {}
  itemList: Items[] = [];

  access_token = this.authservice.getToken();

  addFavourite(itemId: number) {
    return this.http.get(environment.baseURL + `item/add-favourite/${itemId}`);
  }

  deleteMultipleItems(itemIds: number[]) {
    const data = {
      itemIds: itemIds,
    };
    return this.http.post(environment.baseURL + 'delete-items', data);
  }

  searchItem(item: string, category: number) {
    const params = {
      categoryId: category,
      item: item,
    };
    return this.http.get(environment.baseURL + `items/orderapp/search`, {
      params,
    });
  }

  getFavouriteItems() {
    return this.http.get(environment.baseURL + `items/favourites`);
  }
  uploadImage(formData: any) {
    return this.http.post(environment.baseURL + `upload-image`, formData);
  }

  removeImage(formData: any) {
    return this.http.delete(environment.baseURL + `upload-image/${formData}`);
  }

  getItemData() {
    return this.http.get(environment.baseURL + `item`);
  }

  getSingleItem(id: any) {
    return this.http.get(environment.baseURL + `item/${id}`);
  }

  addItem(data: any): Observable<any> {
    return this.http.post(environment.baseURL + `item`, data);
  }

  addItemList(data: any) {
    return this.http.put(environment.baseURL + `item`, data);
  }

  removeItem(id: number) {
    return this.http.delete(environment.baseURL + `item/` + id);
  }

  removeItemById(id: any) {
    return this.http.delete(environment.baseURL + `item`);
  }

  editItem(element: any) {
    return this.http.put(
      environment.baseURL + `item` + '/' + element.id,
      element,
    );
  }
  data: any;

  getItemByCategory(categoryId: number, pageChange?: any) {
    const params = {
      page: pageChange?.pageIndex + 1 || 1,
      perPage: pageChange?.pageSize || 5,
    };
    return this.http.get(environment.baseURL + `category-items/${categoryId}`, {
      params: params,
    });
  }

  search(item: string, pageChange?: any) {
    const params = {
      page: pageChange?.pageIndex + 1 || 1,
      perPage: pageChange?.pageSize || 5,
    };
    return this.http.get(environment.baseURL + `item/search/${item}`, {
      params,
    });
  }
}
