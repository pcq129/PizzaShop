import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Modifier } from 'src/app/shared/interfaces/modifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { whitespaceValidator } from 'src/app/shared/validators/validators';
@Component({
  selector: 'modifier-dialog',
  templateUrl: 'modifier-dialog.component.html',
  styleUrls: ['../../modifier.component.scss']
})
export class modifierDialog {
  constructor(
    public dialogRef: MatDialogRef<modifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);

    console.log(data.modifier_group_id);
    // data.modifier_group_id.forEach((element:any) => {
    //   this.modifierGroupId.push(element.pivot.modifier_group_id);
    // });

    console.log(this.modifierGroupId);


  }

  modifierGroupId : any[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifierForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      whitespaceValidator
    ]),
    rate: new FormControl(this.data.rate, Validators.required),
    modifier_group_id: new FormControl(this.data.modifier_group_id),
    quantity: new FormControl(this.data.quantity, Validators.required),
    unit: new FormControl(this.data.unit, Validators.required),
    description: new FormControl(this.data.description, [

    ]),
  });
  // name = this.modifierForm.controls.name;
  // rate = this.modifierForm.controls.rate;
  // quantity = this.modifierForm.controls.quantity;
  // unit = this.modifierForm.controls.unit;
  // description = this.modifierForm.controls.description;
  // groupId = this.modifierForm.controls.groupId;


}
