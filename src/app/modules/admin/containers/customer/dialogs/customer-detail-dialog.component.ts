import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ICustomer, ICustomerDialog } from '../model/customer';
import { IOrder } from '../../orders/Model/order';

@Component({
  selector: 'customer-detail-dialog',
  templateUrl: 'customer-detail-dialog.component.html',
  styleUrls: ['./customer-detail-dialog.component.scss'],
})
export class customerDetailDialog implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICustomerDialog ) {}
  ngOnInit(): void {
    this.parseOrderData(this.data);
    console.log(this.data);
  }

  visits = this.data.orders.length;
  maxAmt = 0;
  calculateAverage() {
    let average = 0;
    this.data.orders.forEach((order: IOrder) => {
      average += order.order_data.total;
      order.order_data.total > this.maxAmt
        ? (this.maxAmt = order.order_data.total)
        : null;
    });

    average = Math.floor(average / this.visits);
    return isNaN(average) ? 0 : average;
  }

  displayedColumns = ['orderDate', 'orderType', 'payment', 'items', 'amount'];

  parseOrderData(data: ICustomerDialog) {
    // console.log(data);
  //   {
  //     "id": 1,
  //     "mobile": "89994959495",
  //     "email": "harmitkatariya153@gmailc.omq",
  //     "name": "harmit",
  //     "status": 2,
  //     "head_count": 0,
  //     "section_id": 1,
  //     "created_at": "2025-05-19T11:05:12.000000Z",
  //     "updated_at": "2025-05-19T11:05:12.000000Z",
  //     "deleted_at": null,
  //     "orders": [
  //         {
  //             "id": 100,
  //             "customer_id": 1,
  //             "order_status": "Completed",
  //             "order_data": "{\"table_ids\":[1],\"table_names\":[\"t2\"],\"section_id\":1,\"section_name\":\"etes\",\"items\":[{\"item_id\":4,\"item_name\":\"t\",\"item_rate\":35.02,\"modifiers\":[],\"multiplier\":1}],\"taxes\":{},\"subTotal\":35,\"total\":35}",
  //             "payment_mode": "Cash",
  //             "payment_status": "Completed",
  //             "bill_amount": 35,
  //             "rating": "{\"food\":3,\"ambience\":2,\"service\":4}",
  //             "comment": "test",
  //             "deleted_at": null,
  //             "created_at": "2025-05-19T11:05:16.000000Z",
  //             "updated_at": "2025-05-19T11:05:24.000000Z"
  //         }
  //     ]
  // }

    return data.orders.map((order: IOrder) => {
      if (order.order_data && typeof order.order_data === 'string') {
        order.order_data = JSON.parse(order.order_data);
      }
      return order;
    });
  }
}
