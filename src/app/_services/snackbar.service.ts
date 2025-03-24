import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;



  error(message: string) {
    return this._snackBar.open(message, 'close', {panelClass: ['snackbar-error','snackbar'],horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: this.durationInSeconds * 1000});
  }

  success(message: string) {
    return this._snackBar.open(message, 'close', {panelClass: ['snackbar-success','snackbar'],horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: this.durationInSeconds * 1000});
  }

  info(message: string) {
    return this._snackBar.open(message, 'close', {panelClass: ['snackbar-info','snackbar'],horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: this.durationInSeconds * 1000});
  }
}