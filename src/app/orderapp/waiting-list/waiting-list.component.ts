import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../_services/order-service.service';
import { MatDialog } from '@angular/material/dialog';
import { waitingTokenDialog } from '../order-tables/dialogs/waitingTokenDialog.component';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TableSectionService } from 'src/app/_services/table-section.service';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';

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
    private sectionService: TableSectionService
  ) {
    this.getWaitingTokenData();
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
        if (res.status == 'true') {
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
            if (res.status == 'false') {
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

  editWaitingToken(waitingTokenId : any) {
    console.log(waitingTokenId);

    const newTokenDialog = this.dialog.open(waitingTokenDialog, {
      width: '400px',
      data: {
        // sectionList: this.waitingTokenData,
        id : waitingTokenId
      },
    });

    newTokenDialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.sectionService.updateWaitingToken(res).subscribe({
          next: (res: any) => {
            if (res.status == 'false') {
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
  deleteWaitingToken(waitingToken : any) {
    console.log(waitingToken);
    let id = waitingToken.id;

    const newTokenDialog = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: {
        sectionList: this.waitingTokenData,
        waitingToken : waitingToken
      },
    });

    newTokenDialog.afterClosed().subscribe((res: any) => {
      let data = {
        id: res,
        delete: true
      }
      if (res) {
        this.sectionService.updateWaitingToken(data).subscribe({
          next: (res: any) => {
            if (res.status == 'false') {
              this.snackbarService.error(res.message);
              // this.router.navigateByUrl('order/menu');
            } else {
              this.snackbarService.success("Waiting token cancelled");
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
