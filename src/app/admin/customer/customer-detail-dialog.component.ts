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


  edata = {
    "id": 10,
    "mobile": "9834937844",
    "email": "spaneliya@gmail.com",
    "name": "feewrer",
    "created_at": "2025-04-09T06:23:49.000000Z",
    "updated_at": "2025-04-09T11:13:14.000000Z",
    "deleted_at": null,
    "orders": [
      {
        "id": 33,
        "customer_id": 10,
        "order_status": "Completed",
        "order_data": {
          "table_ids": [
            17
          ],
          "table_names": [
            "t5"
          ],
          "section_id": 2,
          "section_name": "First Floor",
          "items": [
            {
              "item_id": 2,
              "item_name": "Thin Crust",
              "item_rate": 560.88,
              "modifiers": [],
              "multiplier": 1
            },
            {
              "item_id": 3,
              "item_name": "Veg Sandwich",
              "item_rate": 184.5,
              "modifiers": [],
              "multiplier": 1
            }
          ],
          "number_of_persons": 3,
          "taxes": {
            "GST": 134.1,
            "SGST": 134.1,
            "CGST": 0,
            "Service charges": 0
          },
          "subTotal": 745,
          "total": 1013.2
        },
        "payment_mode": "Cash",
        "payment_status": "Completed",
        "bill_amount": 1013,
        "rating": "4",
        "comment": null,
        "deleted_at": null,
        "created_at": "2025-04-10T03:56:33.000000Z",
        "updated_at": "2025-04-10T04:31:05.000000Z"
      },
      {
        "id": 34,
        "customer_id": 10,
        "order_status": "Ordered",
        "order_data": {
          "table_ids": [],
          "table_names": [
            "h5"
          ],
          "section_id": 2,
          "section_name": "First Floor",
          "items": [
            {
              "item_id": 5,
              "item_name": "Tandoori Burger",
              "item_rate": 504,
              "modifiers": [
                {
                  "modifier_id": 7,
                  "modifier_name": "Jumbo",
                  "modifier_rate": 80
                },
                {
                  "modifier_id": 8,
                  "modifier_name": "Regular",
                  "modifier_rate": 60
                },
                {
                  "modifier_id": 2,
                  "modifier_name": "Medium",
                  "modifier_rate": 200
                }
              ],
              "multiplier": 1
            },
            {
              "item_id": 4,
              "item_name": "Aloo Tikki Burger",
              "item_rate": 384.2,
              "modifiers": [
                {
                  "modifier_id": 4,
                  "modifier_name": "BBQ",
                  "modifier_rate": 50
                },
                {
                  "modifier_id": 5,
                  "modifier_name": "Alfredo",
                  "modifier_rate": 200
                }
              ],
              "multiplier": 1
            },
            {
              "item_id": 2,
              "item_name": "Thin Crust",
              "item_rate": 560.88,
              "modifiers": [],
              "multiplier": 1
            }
          ],
          "number_of_persons": 4,
          "taxes": {
            "GST": 367.02,
            "SGST": 367.02,
            "CGST": 0,
            "Service charges": 0
          },
          "subTotal": 2039,
          "total": 2773.04
        },
        "payment_mode": "Card",
        "payment_status": "Pending",
        "bill_amount": 2773,
        "rating": "4",
        "comment": null,
        "deleted_at": null,
        "created_at": "2025-04-10T04:14:52.000000Z",
        "updated_at": "2025-04-10T04:14:52.000000Z"
      },
      {
        "id": 35,
        "customer_id": 10,
        "order_status": "Ordered",
        "order_data": {
          "table_ids": [
            18
          ],
          "table_names": [
            "h5"
          ],
          "section_id": 2,
          "section_name": "First Floor",
          "items": [
            {
              "item_id": 2,
              "item_name": "Thin Crust",
              "item_rate": 560.88,
              "modifiers": [],
              "multiplier": 1
            },
            {
              "item_id": 5,
              "item_name": "Tandoori Burger",
              "item_rate": 504,
              "modifiers": [
                {
                  "modifier_id": 5,
                  "modifier_name": "Alfredo",
                  "modifier_rate": 200
                }
              ],
              "multiplier": 1
            }
          ],
          "number_of_persons": 5,
          "taxes": {
            "GST": 227.52,
            "SGST": 227.52,
            "CGST": 0,
            "Service charges": 0
          },
          "subTotal": 1264,
          "total": 1719.04
        },
        "payment_mode": "Card",
        "payment_status": "Pending",
        "bill_amount": 1719,
        "rating": "4",
        "comment": null,
        "deleted_at": null,
        "created_at": "2025-04-10T06:21:31.000000Z",
        "updated_at": "2025-04-10T06:21:31.000000Z"
      }
    ]
  }

  parseOrderData(data: any): any {
    return data.orders.map((order: any) => {
      if (order.order_data && typeof order.order_data === 'string') {
        order.order_data = JSON.parse(order.order_data);
      }
      return order;
    });

  }

}
