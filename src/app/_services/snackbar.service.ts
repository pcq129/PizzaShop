import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) {
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;



  toTitleCase(message : string) {
    return message
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  error(rawMessage: string) {
    let message = this.toTitleCase(rawMessage);
    return this._snackBar.open(message, 'close', {panelClass: ['snackbar-error','snackbar'],horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: this.durationInSeconds * 1000});
  }

  success(rawMessage: string) {
    let message = this.toTitleCase(rawMessage);

    return this._snackBar.open(message, 'close', {panelClass: ['snackbar-success','snackbar'],horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: this.durationInSeconds * 1000});
  }

  info(rawMessage: string) {
    let message = this.toTitleCase(rawMessage);

    return this._snackBar.open(message, 'close', {panelClass: ['snackbar-info','snackbar'],horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: this.durationInSeconds * 1000});
  }


  multipleErrors(rawMessage: any){

    let message = this.toTitleCase(rawMessage);

    // message.forEach(element => {
    //   this.error(`${element}`)
    // });
    // if(Object.keys(message).length == 1){
    //   this.error('message');
    // }
    // else{
      for(const[key,value] of Object.entries(message)){
        this.error(`${value}`);
      }
    // }

  }
}