import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
  }




  dataForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    description: new FormControl(this.data.description, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    tax: new FormControl(this.data.tax, [
      Validators.required,
    ]),
    quantity: new FormControl(this.data.quantity, [
      Validators.required,
    ]),
    unit: new FormControl(this.data.unit, [
      Validators.required,
    ]),
    rate: new FormControl(this.data.rate, [
      Validators.required,
    ]),
    category_id: new FormControl(this.data.category_id, Validators.required),
  });

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getNameError() {
      if (this.dataForm.controls.name.hasError('required')) {
        return 'You must enter a name';
      };
      if (this.dataForm.controls.name.hasError('whitespace')) {
        return 'Invalid input';
      };
      return;
  }
  getUnitError() {
    if (this.dataForm.controls.unit.hasError('required')) {
      return 'You must select a unit';
    };
    return;
  }
  getDescriptionError() {
    if (this.dataForm.controls.description.hasError('required')) {
      return 'You must enter a description';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getRateError() {
    if (this.dataForm.controls.rate.hasError('required')) {
      return 'You must enter a rate';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getQuantityError() {
    if (this.dataForm.controls.quantity.hasError('required')) {
      return 'You must enter a quantity';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getTaxError() {
    if (this.dataForm.controls.tax.hasError('required')) {
      return 'You must specify tax';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getCategoryError(){
    return 'You must select a category';
  }


  // getCatList() {
  //   this.categoryList.getCategoryList().subscribe((res) => {
  //     this.categories = res;
  //   });
  // }
}
