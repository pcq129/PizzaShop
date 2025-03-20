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

  getItemList() {
    return this.http.get(environment.baseURL + `items`);
  }

  addItem(data: any) {
    return this.http.post(environment.baseURL + `items`, data);
  }

  addItemList(data: any) {
    return this.http.put(environment.baseURL + `items`, data);
  }

  removeItem(data: any) {
    return this.http.delete(environment.baseURL + `items`,data);
  }

  removeItemById(id: any) {
    return this.http.delete(environment.baseURL + `items`, id);
  }
  removeItemAll() {
    // console.log(this.data);
    const postsIdsArray = this.data.map((post: any) => post.id);
    // console.log(postsIdsArray);
    postsIdsArray.forEach((elem: any) => this.removeItemById(elem).subscribe());
    // return this.http.delete(environment.baseURL + 'items');
  }

  editItem(element: any) {
    return this.http.put(
      environment.baseURL + `items` + '/' + element.id,
      element
    );
  }

  DeleteInsert(input: any) {
    console.log(input);
    this.removeItemAll();
    input.array.forEach((dataPoint: any) => {
      this.addItem(dataPoint);
      console.log(dataPoint);
    });
  }
  data: any;

  removeItemOnCategoryDelete(category: any) {
    this.getItemList().subscribe((res: any) => {
      this.data = res;
      const data = res.filter((t: any) => t.category != category.name);
      console.log(data);
      this.DeleteInsert(data);
      // this.addItemList(data).subscribe((res) => {
      //   console.log(res);
      // });
    });
  }
}
