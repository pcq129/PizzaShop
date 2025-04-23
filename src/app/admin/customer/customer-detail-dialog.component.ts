import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'customer-detail-dialog',
  templateUrl: 'customer-detail-dialog.component.html',
  styleUrls: ['./customer-detail-dialog.component.scss']
})
export class customerDetailDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }
  ngOnInit(): void {


  this.parseOrderData(this.data);
  console.log(this.data);


  }

  visits = this.data.orders.length;
  maxAmt = 0;
  calculateAverage(){
    let average = 0;
    this.data.orders.forEach((order:any) => {
      average+=order.order_data.total;
      order.order_data.total>this.maxAmt ? this.maxAmt = order.order_data.total: null ;
    });

    return Math.floor(average/this.visits);
  }

  displayedColumns = ['orderDate', 'orderType', 'payment', 'items', 'amount'];



  parseOrderData(data: any): any {
    return data.orders.map((order: any) => {
      if (order.order_data && typeof order.order_data === 'string') {
        order.order_data = JSON.parse(order.order_data);
      }
      return order;
    });

  }

}
