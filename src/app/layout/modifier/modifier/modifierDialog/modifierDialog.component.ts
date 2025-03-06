import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Modifier } from 'src/app/common/interfaces/modifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'modifierDialog',
  templateUrl: 'modifierDialog.html',
})
export class modifierDialog {
  clg(a: any) {
    console.log(a);
  }
  constructor(
    public dialogRef: MatDialogRef<modifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifierForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    rate: new FormControl(this.data.rate, Validators.required),
    groupId: new FormControl('', Validators.required),
    quantity: new FormControl(this.data.quantity, Validators.required),
    unit: new FormControl(this.data.unit, Validators.required),
    description: new FormControl(this.data.description, [
      Validators.required,
      this.whitespaceValidator,
    ]),
  });
  name = this.modifierForm.controls.name;
  rate = this.modifierForm.controls.rate;
  quantity = this.modifierForm.controls.quantity;
  unit = this.modifierForm.controls.unit;
  description = this.modifierForm.controls.description;
  groupId = this.modifierForm.controls.groupId;

  printdata() {
    console.log(
      this.data,
      this.name.status,
      this.rate.status,
      this.quantity.status,
      this.unit.status,
      this.description.status,
      this.groupId,
      this.modifierForm.status
    );
  }

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
