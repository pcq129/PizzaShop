import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../admin/containers/orders/_services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { waitingTokenDialog } from '../order-tables/dialogs/waitingTokenDialog.component';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { TableSectionService } from '../../admin/containers/table-section/_services/table-section.service';
import { DeleteDialogComponent } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
})
export class WaitingListComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private sectionService: TableSectionService,
  ) {
    this.getWaitingTokenData();
    console.log(this.waitingTokenData);
  }

  ngOnInit(): void {}

  waitingTokenData: any = [];

  displayedColumns = [
    'id',
    'updatedAt',
    'waitingTime',
    'name',
    'headCount',
    'phone',
    'email',
    'actions',
  ];

  getWaitingTokenData() {
    this.orderService.getWaitingTokenData().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.waitingTokenData = res.data;
          console.log(this.waitingTokenData);
        } else {
          return;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createWaitingToken() {
    console.log('waitin token generatino');

    const newTokenDialog = this.dialog.open(waitingTokenDialog, {
      width: '600px',
      data: {
        sectionList: this.waitingTokenData,
      },
    });

    newTokenDialog.afterClosed().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.sectionService.createWaitingToken(res).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarService.error(res.message);
              // this.router.navigateByUrl('order/menu');
            } else {
              this.snackbarService.success(res.message);
              this.getWaitingTokenData();
              // this.router.navigateByUrl('order/menu');
            }
          },
          error: (err) => {
            this.snackbarService.error(err);
          },
        });
      }
    });
  }

  editWaitingToken(waitingToken: any) {
    console.log(waitingToken);

    const newTokenDialog = this.dialog.open(waitingTokenDialog, {
      width: '400px',
      data: {
        sectionList: this.waitingTokenData,
        waitingToken: waitingToken,
      },
    });

    newTokenDialog.afterClosed().subscribe((res: any) => {
      console.log(res);

      if (res) {
        this.sectionService.updateWaitingToken(res).subscribe({
          next: (res: any) => {
            console.log(res);

            if (!res.status) {
              this.snackbarService.error(res.message);
              // this.router.navigateByUrl('order/menu');
            } else {
              this.snackbarService.success(res.message);
              this.getWaitingTokenData();
              // this.router.navigateByUrl('order/menu');
            }
          },
          error: (err) => {
            this.snackbarService.error(err);
          },
        });
      }
    });
  }
  deleteWaitingToken(waitingToken: any) {
    console.log(waitingToken);
    let id = waitingToken.id;

    const newTokenDialog = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: {
        // sectionList: this.waitingTokenData,
        waitingToken: waitingToken,
      },
    });

    newTokenDialog.afterClosed().subscribe((res: any) => {
      let data = {
        id: res.waitingToken,
        delete: true,
      };
      if (res) {
        this.sectionService.updateWaitingToken(data).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarService.error(res.message);
              // this.router.navigateByUrl('order/menu');
            } else {
              this.snackbarService.success(res.message);
              this.getWaitingTokenData();
              // this.router.navigateByUrl('order/menu');
            }
          },
          error: (err) => {
            this.snackbarService.error(err);
          },
        });
      }
    });
  }
  assignTable() {
    throw new Error('Method not implemented.');
  }
}
