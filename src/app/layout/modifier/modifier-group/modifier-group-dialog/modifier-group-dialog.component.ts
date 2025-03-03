import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/layout/menu/menu.component';

@Component({
  selector: 'app-modifier-group-dialog',
  templateUrl: './modifier-group-dialog.component.html',
  styleUrls: ['./modifier-group-dialog.component.scss'],
})
export class ModifierGroupDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModifierGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifierGroupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  name = this.modifierGroupForm.controls.name;
  description = this.modifierGroupForm.controls.description;
}
