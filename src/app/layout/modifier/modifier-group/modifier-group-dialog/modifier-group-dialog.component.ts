import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modifier } from 'src/app/common/interfaces/modifier';

@Component({
  selector: 'app-modifier-group-dialog',
  templateUrl: './modifier-group-dialog.component.html',
  styleUrls: ['./modifier-group-dialog.component.scss'],
})
export class ModifierGroupDialogComponent implements OnInit {
  isChecked(modifierId: any) {
    if (this.data.isSelected.includes(modifierId)) {
      return true;
    }
    return false;
  }
  onChange(modifierId: number, event: any) {
    console.log(event);
    if (event.checked) {
      this.data.isSelected.push(modifierId);
    } else {
      let index = this.data.isSelected.indexOf(modifierId);
      this.data.isSelected.splice(index, 1);
    }
  }
  constructor(
    public dialogRef: MatDialogRef<ModifierGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  printdata() {
    console.log(this.data);
  }

  modifierGroupForm = new FormGroup({
    containedModifiers: new FormControl(this.data.modifiers),
    name: new FormControl(this.data.name, [Validators.required, this.whitespaceValidator]),
    description: new FormControl(this.data.description, [
      Validators.required,
      this.whitespaceValidator,
    ]),
  });


  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getNameError() {
    if (this.modifierGroupForm.controls.name.hasError('required')) {
      return 'You must enter a name';
    };
    if (this.modifierGroupForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
}

getDescriptionError() {
  if (this.modifierGroupForm.controls.description.hasError('required')) {
    return 'You must enter a description';
  };
  if (this.modifierGroupForm.controls.name.hasError('whitespace')) {
    return 'Invalid input';
  };
  return;
}
}
