import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http : HttpClient
  ) { }

  getCustomerData(pageEvent? : any){
    const params = {
      page : pageEvent?.pageIndex+1 || 1,
      perPage : pageEvent?.pageSize || 5
    }
    return this.http.get(environment.baseURL + 'customers', {params: params});
  }

  searchCustomer(name : string){
    return this.http.get(environment.baseURL + `customer/search/${name}`);
  }
}
