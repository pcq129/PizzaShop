import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.orderData = JSON.parse(this.data.order_data);
    console.log(this.orderData);



  }

  onCancel(): void {
    this.data = null;
    this.dialogRef.close();
    console.log();
  }


  orderData : any;
  // displayedColumns = []

  orderItems = [
    {
      name: 'Grilled burger',
      subItems: ['Tomato'],
      quantities: [1, 1],
      prices: [70, 5],
      amounts: [70, 5]
    },
    {
      name: 'Margherita',
      subItems: ['test'],
      quantities: [2, 2],
      prices: [120, 2],
      amounts: [240, 4]
    },
    {
      name: 'Grilled burger',
      subItems: ['Babycorn'],
      quantities: [1, 1],
      prices: [70, 10],
      amounts: [70, 10]
    }
  ];

  displayedColumns: string[] = ['srNo', 'item', 'qty', 'price', 'amount'];


  // {
  //   "id": 8,
  //   "customer_id": 2,
  //   "order_status": "Completed",
  //   {
  // order_data:
//   "tables": [
//     13
//   ],
//   "items": [
//     {
//       "item_id": 2,
//       "item_name": "Thin Crust",
//       "item_rate": 560.88,
//       "modifiers": [],
//       "multiplier": 3
//     }
//   ],
//   "taxes": {
//     "GST": 100.8,
//     "SGST": 100.8,
//     "CGST": 0,
//     "Service charges": 230
//   },
//   "subTotal": 560,
//   "total": 991.6
// }
  //   "payment_mode": "Cash",
  //   "payment_status": "Completed",
  //   "bill_amount": 992,
  //   "rating": "1",
  //   "comment": null,
  //   "deleted_at": null,
  //   "created_at": "2025-04-08T04:19:16.000000Z",
  //   "updated_at": "2025-04-09T09:30:22.000000Z",
  //   "customer": {
  //     "id": 2,
  //     "mobile": "9477384958",
  //     "email": "user@user.com",
  //     "name": "harmti",
  //     "created_at": "2025-04-07T09:06:33.000000Z",
  //     "updated_at": "2025-04-07T09:06:33.000000Z",
  //     "deleted_at": null
  //   }
  // }
}
