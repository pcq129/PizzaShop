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
  count = 0;
  counter(){
    this.count+=1;
    return this.count;
  }


// data
  // {
  //   "id": 31,
  //   "customer_id": 10,
  //   "order_status": "Ordered",
  //   "order_data":{
                //   "tables":[13],
                //   "items":[{
                //     "item_id":3,
                //     "item_name":"Veg Sandwich",
                //     "item_rate":184.5,
                //     "modifiers":[],
                //     "multiplier":1,
                //     }],
                //   "number_of_persons":4,
                //   "taxes":{
                //     "GST":33.12,
                //     "SGST":33.12,
                //     "CGST":0,
                //     "Service charges":0
                //     },
                //   "subTotal":184,
                //   "total":250.24,
                // "section_name"
                // "section_id"
}



  //   "payment_mode": "Card",
  //   "payment_status": "Pending",
  //   "bill_amount": 4334,
  //   "rating": "4",
  //   "comment": null,
  //   "deleted_at": null,
  //   "created_at": "2025-04-09T13:19:32.000000Z",
  //   "updated_at": "2025-04-09T13:19:32.000000Z",
  //   "customer": {
  //     "id": 10,
  //     "mobile": "9834937844",
  //     "email": "spaneliya@gmail.com",
  //     "name": "feewrer",
  //     "created_at": "2025-04-09T06:23:49.000000Z",
  //     "updated_at": "2025-04-09T11:13:14.000000Z",
  //     "deleted_at": null
  //   }
  // }




  // {
  //   "id": 30,
  //   "customer_id": 10,
  //   "order_status": "Ordered",
  //   "order_data": "{\"tables\":[13],\"items\":[{\"item_id\":3,\"item_name\":\"Veg Sandwich\",\"item_rate\":184.5,\"modifiers\":[]}],\"number_of_persons\":4,\"taxes\":{\"GST\":33.12,\"SGST\":33.12,\"CGST\":0,\"Service charges\":0},\"subTotal\":184,\"total\":250.24}",
  //   "payment_mode": "Card",
  //   "payment_status": "Pending",
  //   "bill_amount": 250,
  //   "rating": "4",
  //   "comment": null,
  //   "deleted_at": null,
  //   "created_at": "2025-04-09T11:47:29.000000Z",
  //   "updated_at": "2025-04-09T11:47:29.000000Z",
  //   "customer": {
  //     "id": 10,
  //     "mobile": "9834937844",
  //     "email": "spaneliya@gmail.com",
  //     "name": "feewrer",
  //     "created_at": "2025-04-09T06:23:49.000000Z",
  //     "updated_at": "2025-04-09T11:13:14.000000Z",
  //     "deleted_at": null
  //   }
  // }
