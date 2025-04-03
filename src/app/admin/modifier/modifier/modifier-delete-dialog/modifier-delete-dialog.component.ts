import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { Inject, Input } from '@angular/core';

@Component({
  selector: 'modifierDeleteDialog',
  template: `
    <div mat-dialog-content>
      <p>Arey you sure?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Delete</button>
    </div>
  `,
  styleUrls: ['./modifier-delete-dialog.component.scss'],
})
export class ModifierDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModifierDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
