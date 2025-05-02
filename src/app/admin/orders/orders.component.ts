import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { OrderService } from 'src/app/_services/order-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { saveAs } from 'file-saver';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private snackbarService: SnackbarService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.getOrderData();
  }

  ngOnInit(): void {}
  resultsLength: number = 100;
  pagesize: number = 5;
  orderData: any;
  viewOrderData: any;
  displayedColumns = [
    'order',
    'date',
    'customer',
    'paymentStatus',
    'payment_mode',
    'rating',
    'total_amount',
    'orderStatus',
    'actions',
  ];

  getOrderData(event? : any) {
    this.orderService.getOrderData(event).subscribe({
      next: (res: any) => {
        if (res.status == 'true') {
          this.orderData = res.data.data;
          this.viewOrderData = res.data.data;
          this.resultsLength = res.data.total;
          console.log(res.data);
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (error) => {
        this.snackbarService.error('Error fetching orders');
      },
    });
  }

  onPageChange(event : Event) {
    console.log(event);
    //   {
    //     "previousPageIndex": 0,
    //     "pageIndex": 1,
    //     "pageSize": 5,
    //     "length": 14
    // }
    this.getOrderData(event);



  }

  convertDate(isoDate: any) {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day} / ${month} / ${year}`;
  }

  completeOrder(id: number) {
    const confirmation = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Complete Order',
        dialogMessage: 'Are you sure to complete the order?',
        id: id,
        confirmButton: 'Complete Order',
        cancelButton: 'Cancel',
      },
    });

    confirmation.afterClosed().subscribe({
      next: (res: any) => {
        if (res.id) {
          this.orderService.completeOrder(id).subscribe({
            next: (res: any) => {
              if (res.status == 'false') {
                this.snackbarService.error(res.message);
              } else {
                this.snackbarService.success('Order marked as completed');
                this.getOrderData();
              }
            },
            error: (err) => {
              this.snackbarService.error(err);
            },
          });
        }
      },
    });
  }

  viewOrderDetail(order: any) {
    console.log(order);
    this.orderService.setOrderData(order);
    this.router.navigate(['pizzashop/orders/details']);

    // const orderDetailDialog = this.dialog.open(OrderDetailDialogComponent, {
    //   data: order,
    //   width: '1000px',
    // });
  }

  resetData() {
    this.nodata = false;
    this.viewOrderData = this.orderData;
  }

  nodata: boolean = false;
  searchOrder(orderId: string) {
    if (!orderId) {
      this.nodata = false;
      setTimeout(() => {
        this.viewOrderData = this.orderData;
      }, 500);
    } else {
      this.orderService.searchOrder(orderId).subscribe({
        next: (res: any) => {
          if (res.status == 'false') {
            this.nodata = true;
            this.viewOrderData = [];
            return;
          } else if (res.status == 'true') {
            this.nodata = false;

            this.viewOrderData = res.data;
            return;
          } else {
            this.nodata = true;
          }
        },
        error: (err: any) => {
          this.nodata = true;
          this.viewOrderData = [];
        },
      });
    }
  }

  exportOrders(filter: number) {
    this.orderService.exportOrdersToExcel(filter).subscribe({
      // for proper response formatting

      // next: (res: any) => {
      //   if (res.status == 'false') {
      //     console.log('failed');
      //   } else {
      //     let data: any;
      //     if (res.data) {
      //       data = res.data;
      //       (data: Blob) => {
      //         saveAs(data, 'fileName');
      //       };
      //     }
      //   }
      // },

      next: (res: Blob) => {
        saveAs(res, 'All Orders');
      },
      error: (err: any) => {
        console.log('failed');
      },
    });
  }
  getRating(rating: any) {
    let compoundRating = JSON.parse(rating);
    return compoundRating.food;
  }
  Ratings=[1,2,3,4,5];
  getOrderRating(rating: string){
    let parsedRating = JSON.parse(rating);
    return parsedRating.food;
  }
}
