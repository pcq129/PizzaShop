import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './_services/order.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';

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
    this.minDate = new Date(2025, 0, 1);
    this.maxDate = new Date();
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

  status = ['Ordered', 'Completed'];
  minDate: Date;
  maxDate: Date;
  isSearchedData : boolean = false;

  @ViewChild('paginator') paginator! : PaginatorComponent;

  getOrderData(event?: any){
    if(this.isSearchedData){

      let orderId = this.searchData.controls.search.value;
      this.orderService.searchOrder(this.searchData.value ,event).subscribe({
        next: (res: any) => {
          if (!res.status) {
            this.nodata = true;
            this.viewOrderData = [];
            return;
          } else if (res.status) {
            this.nodata = false;
            this.viewOrderData = res.data.data;
            this.resultsLength = res.data.total;
            this.isSearchedData = true;
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
    }else{
      this.orderService.getOrderData(event).subscribe({
        next: (res: any) => {
          if (res.status) {
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
  }


  onPageChange(event: Event) {
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
              if (!res.status) {
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
  filterOrders(orderId: string) {
    // if (!orderId) {
    //   this.nodata = false;
    //   setTimeout(() => {
    //     this.viewOrderData = this.orderData;
    //   }, 500);
    // } else {
this.paginator.resetToFirstPage();

      this.orderService.searchOrder(this.searchData.value).subscribe({
        next: (res: any) => {
          console.log(res);


          if (res.code == 204 || !res.status) {
            this.nodata = true;
            this.viewOrderData = [];
            return;
          } else if (res.status) {
            this.nodata = false;
            this.viewOrderData = res.data.data;
            this.resultsLength = res.data.total;
            this.isSearchedData = true;
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
    // }
  }

  searchData = new FormGroup({
    search: new FormControl(),
    status: new FormControl('0', Validators.required),
    endDate: new FormControl('',Validators.required),
    startDate: new FormControl('',Validators.required),
  });
  exportOrders(filter: any) {
    console.log(filter);

    this.orderService.exportOrdersToExcel(filter).subscribe({
      next: (res: Blob) => {
        saveAs(res, 'All Orders');
      },
      error: (err: any) => {
        console.log('failed');
      },
    });



      // for proper response formatting

      // next: (res: any) => {
      //   if (!res.status) {
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


  }
  getRating(rating: any) {
    let compoundRating = JSON.parse(rating);
    return compoundRating.food;
  }
  Ratings = [1, 2, 3, 4, 5];
  getOrderRating(rating: string) {
    let parsedRating = JSON.parse(rating);
    return parsedRating.food;
  }
}
