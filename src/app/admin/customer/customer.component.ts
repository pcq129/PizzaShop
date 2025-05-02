import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { customerDetailDialog } from './customer-detail-dialog.component';
import { CustomerService } from 'src/app/_services/customer.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

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
  }

  ngOnInit(): void {}

  customerList: any;
  viewCustomerList = [];

  displayedColumns = ['name', 'email', 'phone', 'date', 'totalOrders'];
  pageSize = 5;
  dataLength = 0;
  pageChange(event: any){
    this.getCustomerData(event);
  }
  getCustomerData(pageEvent? : any) {
    this.customerService.getCustomerData(pageEvent).subscribe({
      next: (res: any) => {
        if ((res.status = 'true')) {
          this.customerList = res.data.data;
          this.viewCustomerList = res.data.data;
          this.dataLength = res.data.total;
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

  resetCustomerList() {
    this.nodata = false;
    this.viewCustomerList = this.customerList;
  }


  nodata: boolean = false;
  searchCustomer(name: string) {
    if (name.length < 4) {
      this.nodata = false;
      setTimeout(() => {
        this.viewCustomerList = this.customerList;
      }, 500);
    } else {
      this.customerService.searchCustomer(name).subscribe({
        next: (res: any) => {
          if (res.status == 'false') {
            this.nodata = true;
            console.log('test');

            this.viewCustomerList = [];
            return;
          } else if (res.status == 'true') {
            console.log('test1');
            this.nodata = false;
            this.viewCustomerList = res.data;
            return;
          } else {
            console.log('te1st');
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
}
