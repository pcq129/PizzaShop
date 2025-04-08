import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';


// export interface orderData{
//   customer_id: number,
//   table_id : number[],
//   table_name : string[],
//   section_id : number,
//   section_name : string,
//   item_id: number[],
//   modifiers : any[],
//   amount: number,
//   people: number
// }


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http : HttpClient,
    private router : Router
  ){};

  private orderData = new BehaviorSubject<any>(null);
  currentData = this.orderData.asObservable();


  assignTable(data: any, id: number){
     data.customer_id = id;
     this.orderData.next(data);
  }

  placeOrder(data: any){
    return this.http.post(environment.baseURL + 'order', data);
  }



  // getOrderData(){
  //   console.log(this.orderData);

  //   return this.orderData;
  // }


}
