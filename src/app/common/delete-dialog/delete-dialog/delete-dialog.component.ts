import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'deleteDialog',
  templateUrl: 'delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {
    console.log(this.id);
  }

  onCancel(): void {
    this.id = 0;
    this.dialogRef.close();
    // console.log(this.id);
  }
}
