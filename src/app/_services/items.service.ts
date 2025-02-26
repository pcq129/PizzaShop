import { Injectable } from '@angular/core';
import { Items } from '../common/interfaces/items-interface.data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  itemList: Items[] = [];

  // getItemList() {
  //   return (this.itemList = [
  //     {
  //       category: 'Pizza',
  //       name: 'margerita',
  //       description: 'special cheese',
  //     },
  //     {
  //       category: 'Pizza',
  //       name: '7 cheese',
  //       description: 'special cheese',
  //     },
  //     {
  //       category: 'Burger',
  //       name: 'VegBun',
  //       description: 'special cheese',
  //     },
  //   ]);
  // }

  getItemList() {
    return this.http.get(environment.baseURL + `items`);
  }

  addItem(data: any) {
    return this.http.post(environment.baseURL + `items`, data);
  }

  removeItem(data: any){
    return this.http.delete(environment.baseURL + `items`+ '/'+ data.id);
  }

  editItem(element: any) {
    return this.http.put(
      environment.baseURL + `items` + '/' + element.id,
      element
    );
  }
}
