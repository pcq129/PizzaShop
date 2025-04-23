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

  getCustomerData(){
    return this.http.get(environment.baseURL + 'customers');
  }

  searchCustomer(name : string){
    return this.http.get(environment.baseURL + `customer/search/${name}`);
  }
}
