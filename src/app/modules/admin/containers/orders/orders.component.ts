import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { IOngoingOrder } from './Model/order';
import { IFilter } from '../customer/model/customer';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { OrderService } from './_services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiResponse } from 'src/app/core/model/api-response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';

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
    private router: Router,
  ) {
    this.getOrderData();
    this.minDate = new Date(2025, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {}
  resultsLength: number = 100;
  pagesize: number = 5;
  orderData: IOngoingOrder[] = [];
  viewOrderData: IOngoingOrder[] = [];
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
  isSearchedData: boolean = false;

  @ViewChild('paginator') paginator!: PaginatorComponent;

  getOrderData(event?: PageEvent): void {
    if (this.isSearchedData) {
      let orderId = this.searchData.controls.search.value;
      this.orderService.searchOrder(this.searchData.value, event).subscribe({
        next: (res: ApiResponse) => {
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
        error: (error: Error) => {
          this.nodata = true;
          this.viewOrderData = [];
        },
      });
    } else {
      this.orderService.getOrderData(event).subscribe({
        next: (res: ApiResponse) => {
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

  onPageChange(event: PageEvent): void {
    this.getOrderData(event);
  }

  convertDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day} / ${month} / ${year}`;
  }

  completeOrder(id: number): void {
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
      next: (res) => {
        if (res.id) {
          this.orderService.completeOrder(id).subscribe({
            next: (res: ApiResponse) => {
              if (!res.status) {
                this.snackbarService.error(res.message);
              } else {
                this.snackbarService.success('Order marked as completed');
                this.getOrderData();
              }
            },
            error: (error: Error) => {
              this.snackbarService.error(error.message);
              console.error(error);
            },
          });
        }
      },
    });
  }

  viewOrderDetail(order: IOngoingOrder): void {
    console.log(order);
    this.orderService.setOrderData(order);
    this.router.navigate(['pizzashop/orders/details']);
  }

  resetData(): void {
    this.nodata = false;
    this.viewOrderData = this.orderData;
  }

  nodata: boolean = false;
  filterOrders(orderId: string): void {
    this.paginator.resetToFirstPage();

    this.orderService.searchOrder(this.searchData.value).subscribe({
      next: (res: ApiResponse) => {
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
      error: (error: Error) => {
        this.nodata = true;
        this.viewOrderData = [];
        this.snackbarService.error(error.message);
        console.error(error);
      },
    });
    // }
  }

  searchData = new FormGroup({
    search: new FormControl(),
    status: new FormControl('0', Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
  });
  exportOrders(filter: IFilter): void {
    console.log(filter);

    this.orderService.exportOrdersToExcel(filter).subscribe({
      next: (res: Blob) => {
        saveAs(res, 'All Orders');
      },
      error: (error: Error) => {
        console.error(error.message);
      },
    });
  }
  getRating(rating: string): JSON {
    let compoundRating = JSON.parse(rating);
    return compoundRating.food;
  }
  Ratings = [1, 2, 3, 4, 5];
  getOrderRating(rating: string): number {
    let parsedRating = JSON.parse(rating);
    return parsedRating.food;
  }
}
