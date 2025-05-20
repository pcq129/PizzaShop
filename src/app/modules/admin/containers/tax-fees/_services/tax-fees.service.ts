import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaxFees } from '../tax-fees';

@Injectable({
  providedIn: 'root',
})
export class TaxFeesService {
  constructor(private http: HttpClient) {}

  toggleTaxes(taxId: number, data: any) {
    return this.http.put(
      environment.baseURL + `tax-fees-toggle/${taxId}`,
      data,
    );
  }

  toggleDefaultState() {
    return this.http.get(environment.baseURL + `tax-fees`);
  }

  getAllTaxFeesData() {
    return this.http.get(environment.baseURL + `tax-fees`);
  }

  addTaxFees(data: any) {
    return this.http.post(environment.baseURL + `tax-fees`, data);
  }

  editTaxFees(data: TaxFees) {
    return this.http.put(environment.baseURL + `tax-fees/${data.id}`, data);
  }

  getTaxFees(id: number) {
    return this.http.get(environment.baseURL + `tax-fees/${id}`);
  }

  deleteTaxFees(id: number) {
    return this.http.delete(environment.baseURL + `tax-fees/${id}`);
  }

  search(taxName: string) {
    return this.http.get(environment.baseURL + `tax-fees/search/${taxName}`);
  }
}
