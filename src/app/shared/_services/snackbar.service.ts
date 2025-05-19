import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  toTitleCase(message: string) {
    return message
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  error(rawMessage: string) {
    console.log(rawMessage);

    let message = this.toTitleCase(rawMessage);
    return this._snackBar.open(rawMessage, 'close', {
      panelClass: ['snackbar-error', 'snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  success(rawMessage: string) {
    let message = this.toTitleCase(rawMessage);

    return this._snackBar.open(rawMessage, 'close', {
      panelClass: ['snackbar-success', 'snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  info(rawMessage: string) {
    let message = this.toTitleCase(rawMessage);

    return this._snackBar.open(rawMessage, 'close', {
      panelClass: ['snackbar-info', 'snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
