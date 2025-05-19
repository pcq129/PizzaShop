import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { customerDetailDialog } from './dialogs/customer-detail-dialog.component';
import { CustomerService } from './_services/customer.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { ICustomer, IFilter } from './model/customer';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse } from 'src/app/core/model/api-response';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private snackbarService: SnackbarService
  ) {
    this.getCustomerData();
    this.minDate = new Date(2025, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {}

  @ViewChild('paginator') paginator!: PaginatorComponent;
  customerList: ICustomer[]|undefined;
  viewCustomerList: ICustomer[]|undefined;
  resultLength: number = 0;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  nodata: boolean = false;
  searchData: boolean = false;
  searchQuery: IFilter|undefined;

  displayedColumns = ['name', 'email', 'phone', 'date', 'totalOrders'];
  pageSize = 5;

  searchForm = new FormGroup({
    search: new FormControl(''),
    // status: new FormControl('0', Validators.required),
    endDate: new FormControl( undefined, Validators.required),
    startDate: new FormControl(undefined,  Validators.required),
  });

  exportCustomers(query: IFilter): void {
    this.customerService.exportCustomers(query).subscribe({
      next: (res: Blob) => {
        saveAs(res, 'Customers');
      },
      error: (error : Error) => {
        this.snackbarService.error("Error occured, pleaset try again later.");
        console.error(error);
      },
    });
  }
  pageChange(event: PageEvent):void {
    if (this.searchData) {
      this.searchCustomer(this.searchQuery!, event);
    } else {
      this.getCustomerData(event);
    }
  }
  getCustomerData(pageEvent?: PageEvent):void {
    this.customerService.getCustomerData(pageEvent).subscribe({
      next: (res: ApiResponse) => {
        if (res.status) {
          this.customerList = res.data.data;
          this.viewCustomerList = res.data.data;
          this.resultLength = res.data.total;
          if (!pageEvent) {
            this.paginator.resetToFirstPage();
          }
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (error) => {
        console.log(error);

        this.snackbarService.error(error.message);
      },
    });
  }

  customerDataPopup(customer: ICustomer):void {
    const dialog = this.dialog.open(customerDetailDialog, {
      width: '1000px',
      data: customer,
    });
  }

  resetSearch(): void {
    this.nodata = false;
    this.searchData = false;
    this.searchQuery = undefined ;
    this.getCustomerData();
  }



  searchCustomer(searchQuery: IFilter, pageChange?: PageEvent):void {
    this.customerService.searchCustomer(searchQuery, pageChange).subscribe({
      next: (res: ApiResponse) => {
        if (!res.status) {
          this.nodata = true;
          console.log('test');
          this.viewCustomerList = [];
          return;
        } else if (res.status) {
          console.log('test1');
          this.nodata = false;
          this.viewCustomerList = res.data.data;
          this.searchData = true;
          this.searchQuery = searchQuery;
          this.resultLength = res.data.total || 0;
          if (!pageChange) {
            this.paginator.resetToFirstPage();
          }
          return;
        } else {
          this.nodata = true;
        }
      },
      error: (error : Error) => {
        this.nodata = true;
        this.viewCustomerList = [];
        console.error(error.message);
      },
    });
  }
}
