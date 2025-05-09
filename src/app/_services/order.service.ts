import { ListKeyManager } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { LoginFormComponent } from '../auth/login/login-form/login-form.component';


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
    private router : Router,
    private datepipe : DatePipe
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

  // searchOrder(orderId : string, searchData: any , pageChange?: any){
  //   console.log(searchData);

  //   let start_date = this.datepipe.transform(searchData.startDate, 'dd-MM-yyyy');
  //   let end_date = this.datepipe.transform(searchData.endDate, 'dd-MM-yyyy');

  //   const params = {
  //     page : pageChange?.pageIndex+1 || 1,
  //     perPage : pageChange?.pageSize || 5,
  //     status : searchData.status,
  //     start_date : start_date,
  //     end_date : end_date
  //   }
  //   return this.http.get(environment.baseURL +  `order/search/${orderId}`, {params: params})
  // }


  searchOrder(searchData?: any, pageChange?: any) {

    let start_date = this.datepipe.transform(searchData.startDate, 'dd/MM/yyyy');
    let end_date = this.datepipe.transform(searchData.endDate, 'dd/MM/yyyy');

    console.log(start_date, end_date);


    const params: any = {
      page: pageChange?.pageIndex + 1 || 1,
      perPage: pageChange?.pageSize || 5,
      status: searchData.status || 0,
      start_date: start_date,
      end_date: end_date,
      order_id: searchData.search || 0
    };

    return this.http.get(`${environment.baseURL}orders/search`, {params:params});
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


  exportOrdersToExcel(filterData: any) {


    let start_date = this.datepipe.transform(filterData.startDate, 'dd/MM/yyyy');
    let end_date = this.datepipe.transform(filterData.endDate, 'dd/MM/yyyy');

    console.log(start_date, end_date);


    const params: any = {
      status: filterData.status || 0,
      start_date: start_date,
      end_date: end_date,
      order_id: filterData.search || 0
    };


    return this.http.get(environment.baseURL + `export-excel`, { params:params, responseType: 'blob' });
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
