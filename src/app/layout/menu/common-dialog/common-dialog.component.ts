import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/common/interfaces/DialogData';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'common-dialog.component.html',
})
export class DialogComponent {
  categoryName: string = '';
  categoryDescription: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
