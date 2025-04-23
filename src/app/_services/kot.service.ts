import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KotService {

  constructor(
    private http : HttpClient,
  ) { }


  getKotData(){
    return this.http.get(environment.baseURL  + 'kots');
  }

}
