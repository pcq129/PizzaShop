import { ListKeyManager } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { LoginFormComponent } from 'src/app/modules/auth/login/login-form/login-form.component';
import {
  EOrderStatus,
  EPaymentMode,
  EPaymentStatus,
  IFeedback,
  IOngoingOrder,
  IOrder,
} from '../Model/order';
import { IFilter } from '../../customer/model/customer';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse } from 'src/app/core/model/api-response';

interface IAssignData {
  email: string;
  name: string;
  mobile: number;
  head_count: number;
  section: string;
  section_id: number;
  customer_id: number;
  table_ids: number[];
  table_names: string[];
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private datepipe: DatePipe,
  ) {}

  //methods and variables for order creation

  private orderData = new BehaviorSubject<IOrder | undefined>(undefined);
  currentData = this.orderData.asObservable();

  assignTable(data: IAssignData, id: number) {
    //   {
    //     "email": "harmtka@as.cld",
    //     "name": "FHA",
    //     "mobile": 1234567889,
    //     "headCount": 1,
    //     "section": "etes",
    //     "section_id": 1,
    //     "table_ids": [
    //         1
    //     ],
    //     "table_names": [
    //         "t2"
    //     ],
    //     "customer_id": 2
    // }

    console.log(data);
    data.customer_id = id;
    this.orderData.next(data);
  }

  clearAssigned() {
    this.orderData.next(undefined);
  }

  cancelOrder(orderData: IOngoingOrder): Observable<ApiResponse> {
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
    let data: IOngoingOrder = {
      table_ids: orderData.table_ids,
      customer_id: orderData.customer_id,
      order_id: orderData.id,
      id: 0,
      order_status: EOrderStatus.Completed,
      payment_mode: EPaymentMode.Online,
      payment_status: EPaymentStatus.Completed,
      bill_amount: 0,
      rating: '',
      comment: '',
      order_data: undefined,
      created_at: undefined,
      deleted_at: null,
      updated_at: undefined,
    };

    return this.http.put<ApiResponse>(environment.baseURL + 'order', data);
  }

  placeOrder(data: IOngoingOrder): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.baseURL + 'order', data);
  }

  searchOrder(
    searchData?: IFilter,
    pageChange?: PageEvent,
  ): Observable<ApiResponse> {
    let start_date = this.datepipe.transform(
      searchData!.startDate,
      'dd/MM/yyyy',
    );
    let end_date = this.datepipe.transform(searchData!.endDate, 'dd/MM/yyyy');

    console.log(start_date, end_date);

    const params = {
      page: pageChange?.pageIndex! + 1 || 1,
      perPage: pageChange?.pageSize || 5,
      status: searchData!.status || 0,
      start_date: start_date || 0,
      end_date: end_date || 0,
      order_id: searchData!.search || 0,
    };

    return this.http.get<ApiResponse>(`${environment.baseURL}orders/search`, {
      params: params,
    });
  }

  getOrderData(page?: PageEvent): Observable<ApiResponse> {
    const params = {
      page: page?.pageIndex! + 1 || 1,
      perPage: page?.pageSize || 5,
    };
    console.log(params);

    return this.http.get<ApiResponse>(environment.baseURL + `order`, {
      params: params,
    });
  }

  completeOrder(id: number): Observable<ApiResponse> {
    //using get method to update the order status because no data is to be transferred
    return this.http.post<ApiResponse>(
      environment.baseURL + `order/${id}`,
      null,
    );
  }

  customerFeedback(data: IFeedback): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      environment.baseURL + 'customer-feedback',
      data,
    );
  }

  exportOrdersToExcel(filterData: IFilter) {
    let start_date = this.datepipe.transform(
      filterData.startDate,
      'dd/MM/yyyy',
    );
    let end_date = this.datepipe.transform(filterData.endDate, 'dd/MM/yyyy');

    console.log(start_date, end_date);

    const params = {
      status: filterData.status || 0,
      start_date: start_date || 0,
      end_date: end_date || 0,
      order_id: filterData.search || 0,
    };

    return this.http.get(environment.baseURL + `export-excel`, {
      params: params,
      responseType: 'blob',
    });
  }

  //methods and variables for order summery/invoice generation/detail viewing

  private orderInvoice = new BehaviorSubject<any>(null);
  currentOrderInvoice = this.orderInvoice.asObservable();

  setOrderData(data: IOngoingOrder) {
    this.orderInvoice.next(data);
  }

  clearOrderData() {
    this.orderData.next(undefined);
  }

  //methods for waiting lists

  getWaitingTokenData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.baseURL + 'waiting-tokens');
  }
}
