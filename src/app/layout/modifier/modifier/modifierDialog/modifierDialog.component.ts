import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Modifier } from 'src/app/common/interfaces/modifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'modifierDialog',
  templateUrl: 'modifierDialog.html',
  styleUrls: ['modifierDialog.scss']
})
export class modifierDialog {
  clg(a: any) {
    console.log(a);
  }
  constructor(
    public dialogRef: MatDialogRef<modifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);

    console.log(data.modifier_group_id);
    data.modifier_group_id.forEach((element:any) => {
      this.modifierGroupId.push(element.pivot.modifier_group_id);
    });

    console.log(this.modifierGroupId);


  }

  modifierGroupId : any[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifierForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    rate: new FormControl(this.data.rate, Validators.required),
    modifier_group_id: new FormControl(this.modifierGroupId),
    quantity: new FormControl(this.data.quantity, Validators.required),
    unit: new FormControl(this.data.unit, Validators.required),
    description: new FormControl(this.data.description, [
      Validators.required,
      this.whitespaceValidator,
    ]),
  });
  // name = this.modifierForm.controls.name;
  // rate = this.modifierForm.controls.rate;
  // quantity = this.modifierForm.controls.quantity;
  // unit = this.modifierForm.controls.unit;
  // description = this.modifierForm.controls.description;
  // groupId = this.modifierForm.controls.groupId;

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
