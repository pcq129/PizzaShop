import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


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

  constructor(){};

  private orderData = new BehaviorSubject<any>({
    "email": "test@test.com",
    "name": "Harmit",
    "mobile": 8788394783,
    "people": 23,
    "section": "Ground Floor",
    "section_id": 1,
    "table_ids": [
      10
    ],
    "table_names": [
      "T1"
    ],
    "id": 2
  }
);
  currentData = this.orderData.asObservable();


  assignTable(data: any, id: number){
     data.id = id;
     this.orderData.next(data);
  }


  // getOrderData(){
  //   console.log(this.orderData);

  //   return this.orderData;
  // }


}
