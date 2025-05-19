import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { customerDetailDialog } from './dialogs/customer-detail-dialog.component';
import { CustomerService } from './_services/customer.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';

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

  customerList: any;
  viewCustomerList = [];
  resultLength: number = 0;
  minDate: Date | undefined;
  maxDate: Date | undefined;

  displayedColumns = ['name', 'email', 'phone', 'date', 'totalOrders'];
  pageSize = 5;

  searchForm = new FormGroup({
    search: new FormControl(),
    // status: new FormControl('0', Validators.required),
    endDate: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
  });

  exportCustomers(query: any) {
    this.customerService.exportCustomers(query).subscribe({
      next: (res: Blob) => {
        saveAs(res, 'Customers');
      },
      error: (err: any) => {
        console.log('failed');
      },
    });
  }
  pageChange(event: any) {
    if (this.searchData) {
      this.searchCustomer(this.searchQuery, event);
    } else {
      this.getCustomerData(event);
    }
  }
  getCustomerData(pageEvent?: any) {
    this.customerService.getCustomerData(pageEvent).subscribe({
      next: (res: any) => {
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

  customerDataPopup(customer: any) {
    const dialog = this.dialog.open(customerDetailDialog, {
      width: '1000px',
      data: customer,
    });

    dialog.afterClosed().subscribe((res: any) => {
      //nothing to do
    });
  }

  resetSearch() {
    this.nodata = false;
    this.searchData = false;
    this.searchQuery = '';
    this.getCustomerData();
  }

  @ViewChild('paginator') paginator!: PaginatorComponent;

  nodata: boolean = false;
  searchData: boolean = false;
  searchQuery: any = '';
  searchCustomer(searchQuery: any, pageChange?: any) {
    console.log(searchQuery);

    this.customerService.searchCustomer(searchQuery, pageChange).subscribe({
      next: (res: any) => {
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
      error: (err: any) => {
        console.log('tes1t');
        this.nodata = true;
        this.viewCustomerList = [];
      },
    });
  }
}
