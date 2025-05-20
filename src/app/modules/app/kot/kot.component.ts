import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KotService } from './_services/kot.service';
import { OrderService } from '../../admin/containers/orders/_services/order.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { KotDialogComponent } from './kot-dialog/kot-dialog.component';

@Component({
  selector: 'app-kot',
  templateUrl: './kot.component.html',
  styleUrls: ['./kot.component.scss'],
})
export class KotComponent implements OnInit {
  constructor(
    private kotService: KotService,
    private snackbarService: SnackbarService,
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {
    this.getOrderKotData();
    this.getKotData();
  }

  ngOnInit(): void {}

  orderKotData: any;
  viewItems = 0;
  kotData: any;

  selectedKOT: number[] = [];

  orderKotDialog(order: any) {
    const kotDialog = this.dialog.open(KotDialogComponent, {
      width: '500px',
      data: {
        orderId: order.id,
        items: order.kots,
        viewItems: this.viewItems,
      },
    });

    kotDialog.afterClosed().subscribe({
      next: (res: number[]) => {
        if (res.length > 0) {
          this.kotStateChange(res);
        }
      },
    });
  }

  kotDialog(kot: any) {
    const kotDialog = this.dialog.open(KotDialogComponent, {
      width: '400px',

      data: {
        orderId: kot.order_id,
        items: [kot],
        viewItems: this.viewItems,
      },
    });

    kotDialog.afterClosed().subscribe({
      next: (res: number[]) => {
        if (res.length > 0) {
          this.kotStateChange(res);
        }
      },
    });
  }

  kotStateChange(kotIds: number[]) {
    let state = 0;
    this.viewItems == 1 ? (state = 0) : (state = 1);
    let data = {
      kotIds: kotIds,
      setState: state,
    };
    this.kotService.completeKot(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.snackbarService.success(res.message);
          this.getOrderKotData();
          this.getKotData();
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (error) => {
        this.snackbarService.error(error.message);
      },
    });
  }

  selectedOrderKots: number[] = [];
  handleOrderSelect(orderId: number) {
    if (this.selectedOrderKots.includes(orderId)) {
      let index = this.selectedOrderKots.indexOf(orderId);
      this.selectedOrderKots.splice(index, 1);
    } else {
      this.selectedOrderKots.push(orderId);
    }
  }
  getKotData() {
    this.kotService.getKotData().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.kotData = res.data;
          setTimeout(() => {
            this.formatData();
          }, 500);
        } else {
          this.snackbarService.error('Error fetching KOTs');
        }
      },
    });
  }

  getOrderKotData() {
    this.kotService.getAllKotData().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.orderKotData = res.data;
          setTimeout(() => {
            this.formatOrderKotData(this.orderKotData);
          }, 500);
        } else {
          this.snackbarService.error('Error fetching All KOTS');
        }
      },
    });
  }

  checkOrderKots(orderId: number) {
    if (this.viewItems == 0 && this.readyOrders.includes(orderId)) {
      return false;
    } else if (this.viewItems == 1 && this.emptyOrders.includes(orderId)) {
      return false;
    } else {
      return true;
    }
  }

  refreshData(viewState: number) {
    this.viewItems = viewState;
    this.getOrderKotData();
    this.getKotData();
  }
  readyOrders: number[] = [];
  emptyOrders: number[] = [];
  formatOrderKotData(res: any) {
    res.forEach((order: any) => {
      let orderKot = order.kots.length;
      let kotCount = 0;
      order.kots.forEach((kot: any) => {
        kotCount += kot.status;
        kot.item_data = JSON.parse(kot.item_data);
      });
      order.order_data = JSON.parse(order.order_data);
      if (kotCount == orderKot) {
        this.readyOrders.push(order.id);
      } else if (kotCount == 0) {
        this.emptyOrders.push(order.id);
      }
    });
    console.log(this.orderKotData);
  }

  formatData() {
    this.kotData.forEach((category: any) => {
      category.kots.forEach((kot: any) => {
        kot.item_data = JSON.parse(kot.item_data);
      });

      // let order_data = JSON.parse(kot.order.order_data);
      // console.log(order_data);
    });
    console.log(this.kotData);
  }

  getTimeDifference(time: string) {
    const kotTime = new Date(time);
    const currentTime = new Date();

    const diffMs = currentTime.getTime() - kotTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours} Hours, ${minutes} Minutes`;
  }
}
