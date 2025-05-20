import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../item-category.component';
import { whitespaceValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'dialog-category',
  templateUrl: 'category-dialog.html',
  styleUrls: ['../../item-category.component.scss'],
})
export class categoryDialogComponent {
  categoryName: string = '';
  categoryDescription: string = '';

  constructor(
    public dialogRef: MatDialogRef<categoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      whitespaceValidator,
    ]),
    description: new FormControl(this.data.description, []),
  });
}
