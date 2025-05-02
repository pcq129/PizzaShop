import { ListKeyManager } from '@angular/cdk/a11y';
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




  //methods and variables for order creation

  private orderData = new BehaviorSubject<any>(null);
  currentData = this.orderData.asObservable();




  assignTable(data: any, id: number){
     data.customer_id = id;
     this.orderData.next(data);
  }

  clearAssigned(){
    this.orderData.next(null);
  }

  cancelOrder(orderData : any){
    // {
    //   "email": "spaneliya@gmail.com",
    //   "name": "feewrer",
    //   "mobile": "9834937844",
    //   "people": 3,
    //   "section": "First Floor",
    //   "section_id": 2,
    //   "table_ids": [
    //     17
    //   ],
    //   "table_names": [
    //     "t5"
    //   ],
    //   "customer_id": 10
    // }
    let data: any = {};
    data.table_ids = orderData.table_ids;
    data.customer_id = orderData.customer_id;
    data.order_id = orderData.id;
    return this.http.put(environment.baseURL + 'order', data)
  }

  placeOrder(data: any){
    return this.http.post(environment.baseURL + 'order', data);
  }

  searchOrder(orderId : string){
    return this.http.get(environment.baseURL +  `order/${orderId}`)
  }



  getOrderData(page?: any){
    const params = {
        page: page?.pageIndex+1 || 1,
        perPage: page?.pageSize || 5,
      }
      console.log(params);


    return this.http.get(environment.baseURL + `order`, {params: params});
  }


  completeOrder(id : number){
    //using get method to update the order status because no data is to be transferred
    return this.http.post(environment.baseURL + `order/${id}`, null)
  }

  customerFeedback(data: any){
    return this.http.post(environment.baseURL + 'customer-feedback', data);
  }


  exportOrdersToExcel(filter: number) {
    return this.http.get(environment.baseURL + `export-excel/${filter}`, { responseType: 'blob' });
  }







  //methods and variables for order summery/invoice generation/detail viewing

  private orderInvoice = new BehaviorSubject<any>(null);
  currentOrderInvoice = this.orderInvoice.asObservable();

  setOrderData(data: any){
    this.orderInvoice.next(data);
  }

  clearOrderData(){
    this.orderData.next(null);
  }




  //methods for waiting lists

  getWaitingTokenData(){
    return this.http.get(environment.baseURL + 'waiting-tokens');
  }
}
