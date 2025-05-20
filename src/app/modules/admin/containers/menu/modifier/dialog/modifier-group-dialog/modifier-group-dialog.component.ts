import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { whitespaceValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-modifier-group-dialog',
  templateUrl: './modifier-group-dialog.component.html',
  styleUrls: ['../../modifier.component.scss'],
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.data.modifiers.forEach((modifier: any) => {
      this.modifiers.push(modifier.id);
    });
    console.log(this.modifiers);
  }

  modifiers: any[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }
  printdata() {
    console.log(this.data);
  }

  modifierGroupForm = new FormGroup({
    modifiers: new FormControl(this.modifiers),
    name: new FormControl(this.data.name, [
      Validators.required,
      whitespaceValidator,
    ]),
    description: new FormControl(this.data.description, []),
  });

  getNameError() {
    if (this.modifierGroupForm.controls.name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.modifierGroupForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getDescriptionError() {
    if (this.modifierGroupForm.controls.description.hasError('required')) {
      return 'You must enter a description';
    }
    if (this.modifierGroupForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }
}
