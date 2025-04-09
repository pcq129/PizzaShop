import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { OrderService } from 'src/app/orderapp/order-service.service';
import { OrderDetailDialogComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    private snackbarService : SnackbarService,
    private orderService : OrderService,
    private dialog : MatDialog
  ) {
    this.getOrderData();
   }

  ngOnInit(): void {
  }

  orderData: any;
  displayedColumns = ['order','date', 'customer', 'orderStatus', 'paymentStatus', 'payment_mode', 'rating', 'total_amount', 'actions'];



  getOrderData(){
    this.orderService.getOrderData().subscribe({
      next: (res:any)=>{
        if(res.status == "true"){
          this.orderData = res.data;
          console.log(res.data);

        }else{
          this.snackbarService.error(res.message);
        }
      },
      error: (err)=>{
        this.snackbarService.error("Error fetching orders")
      }
    })
  }

  convertDate(isoDate: any) {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day} / ${month} / ${year}`;
  }

  completeOrder(id: number){
    this.orderService.completeOrder(id).subscribe({
      next: (res: any)=>{
        if(res.status == 'false'){
          this.snackbarService.error(res.message);
        }
        else{
          this.snackbarService.success("Order marked as completed")
          this.getOrderData();
        }
      },
      error: (err)=>{
        this.snackbarService.error(err);
      }
    })
  }

  viewOrderDetail(order : any){
    console.log(order);

    const orderDetailDialog = this.dialog.open(OrderDetailDialogComponent, {
      data: order,
      width: '1000px',
    });
  }

}
