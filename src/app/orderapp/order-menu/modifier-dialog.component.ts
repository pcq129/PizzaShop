import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface selectedModifers {
  item_id: number;
  item_name: string;
  item_rate : number,
  modifiers: any[];
  multiplier : number
}

@Component({
  selector: 'modifier-dialog',
  templateUrl: 'modifier-dialog.html',
  styleUrls: ['modifier-dialog.component.scss'],
})
export class modifierDialog {
  constructor(
    public dialogRef: MatDialogRef<modifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  currentMG : number = 0;

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifier_ids:any[]=[];

  selectedModifiers: selectedModifers = {
    item_id: this.data.id,
    item_name: this.data.name,
    item_rate : this.data.rate + this.data.rate*(this.data.tax_percentage/100),
    modifiers: [],
    multiplier: 1
  };

  selectModifier(modifier: any) {
    let modifier_id = modifier.id;
    let modifier_name = modifier.name;
    let modifier_rate = modifier.rate;
    let index = null;
    let singleModifier = {
      modifier_id: modifier_id,
      modifier_name: modifier_name,
      modifier_rate: modifier_rate,
    };
    if (this.modifier_ids.includes(modifier_id)) {
      index = this.modifier_ids.indexOf(modifier_id);
      this.modifier_ids.splice(index, 1);
      this.selectedModifiers.modifiers.splice(index, 1);
    } else {
      this.modifier_ids.push(modifier_id);
      this.selectedModifiers.modifiers.push(singleModifier);
    }
    console.log(this.selectedModifiers);
  }
}
