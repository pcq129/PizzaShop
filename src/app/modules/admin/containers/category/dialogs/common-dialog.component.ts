import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../category.component';
import { whitespaceValidator } from 'src/app/shared/validators/validators';
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

  dataForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      whitespaceValidator
    ]),
    description: new FormControl(this.data.description, []),
  });


}
