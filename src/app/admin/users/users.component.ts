import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { UserService } from 'src/app/_services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';

// const ELEMENT_DATA = [
//   { role: 1, name: 'Hydrogen', email: 1.0079, status: 'H' },
//   { role: 2, name: 'Helium', email: 4.0026, status: 'He' },
//   { role: 3, name: 'Lithium', email: 6.941, status: 'Li' },
//   { role: 4, name: 'Beryllium', email: 9.0122, status: 'Be' },
//   { role: 5, name: 'Boron', email: 10.811, status: 'B' },
//   { role: 6, name: 'Carbon', email: 12.0107, status: 'C' },
//   { role: 7, name: 'Nitrogen', email: 14.0067, status: 'N' },
//   { role: 8, name: 'Oxygen', email: 15.9994, status: 'O' },
//   { role: 9, name: 'Fluorine', email: 18.9984, status: 'F' },
//   { role: 10, name: 'Neon', email: 20.1797, status: 'Ne' },
// ];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {
    this.getUserData();
  }
  ngOnInit(): void {}

  userData: any[] = [];

  getUserData() {
    this.userService.getUserData().subscribe({
      next: (res: any) => {
        if (res.status == 'true') {
          this.userData = res.data;
        } else {
          this.snackbarService.error('Error');
        }
      },
    });
  }

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'role',
    'status',
    'action',
  ];
  search = new FormControl('');

  addUserPopup() {
    const addUserPopup = this.dialog.open(UserDialogComponent, {
      width: '1000px',
      data: {
        title: 'Add new User',
        passwords: true,
      },
    });

    addUserPopup.afterClosed().subscribe((result) => {
      console.log(result);
      // this.data = result;
      if (result && result.password) {
        this.userService.addUser(result).subscribe({
          next: (res: any) => {
            if (res.status == 'true') {
              this.snackbarService.success(res.message);
              this.getUserData();
            } else {
              this.snackbarService.multipleErrors(res.message);
            }
          },
          error: (err: any) => {
            throw err;
          },
        });
      }
    });
  }

  editUserPopup(userData: any) {
    const editUserPopup = this.dialog.open(UserDialogComponent, {
      width: '1000px',
      data: {
        title: 'Edit User',
        userData: userData,
        passwords: false,
      },
    });

    let id = userData.id;

    editUserPopup.afterClosed().subscribe((result) => {
      // console.log(result);
      result.id = id;
      // this.data = result;
      if (result) {
        this.userService.editUser(result, id).subscribe({
          next: (res: any) => {
            if (res.status == 'true') {
              this.snackbarService.success(res.message);
              this.getUserData();
            } else {
              this.snackbarService.multipleErrors(res.message);
            }
          },
          error: (err: any) => {
            throw err;
          },
        });
      } else {
        this.snackbarService.error('Failed');
      }
    });
  }

  deleteUserPopup(elementId: number) {
    const deleteUserPopup = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        id: elementId
      },
    });


    deleteUserPopup.afterClosed().subscribe((result) => {

      if (result) {
        this.userService.deleteUser(result.id).subscribe({
          next: (res: any) => {
            if (res.status == 'true') {
              this.snackbarService.success(res.message);
              this.getUserData();
            } else {
              this.snackbarService.error(res.message);
            }
          },
          error: (err: any) => {
            throw err;
          },
        });
      } else {
        this.snackbarService.error('Failed');
      }
    });
  }
}
