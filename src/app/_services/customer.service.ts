import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { start } from '@popperjs/core';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  exportCustomers(query: any) {


    let start_date = this.datepipe.transform(query.startDate, 'dd/MM/yyyy');
    let end_date = this.datepipe.transform(query.endDate, 'dd/MM/yyyy');

    if(!start_date || !end_date){
      start_date = '0';
       end_date = '0';
    }

    console.log(start_date, end_date);


    const params: any = {
      startDate: start_date,
      endDate: end_date,
      search: query.search || 0
    };


    return this.http.get(environment.baseURL + `export-customers`, { params:params, responseType: 'blob' });
  }

  constructor(
    private http : HttpClient,
    private datepipe : DatePipe
  ) { }

  getCustomerData(pageEvent? : any){
    const params = {
      page : pageEvent?.pageIndex+1 || 1,
      perPage : pageEvent?.pageSize || 5
    }
    return this.http.get(environment.baseURL + 'customers', {params: params});
  }

  searchCustomer(filterData : any, pageChange? : any){

    let start_date = this.datepipe.transform(filterData.startDate, 'dd/MM/yyyy');
    let end_date = this.datepipe.transform(filterData.endDate, 'dd/MM/yyyy');
    let name = filterData.search || 0;

    if(!start_date || !end_date){
      start_date = '0';
       end_date = '0';
    }

    const params = {
      'page': pageChange?.pageIndex+1 || 1,
      'perPage' : pageChange?.pageSize || 5,
      'startDate': start_date!,
      'endDate': end_date!
    }
    return this.http.get(environment.baseURL + `customer/search/${name}`,{params});
  }
}
