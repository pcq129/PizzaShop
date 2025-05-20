import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-kot-dialog',
  templateUrl: './kot-dialog.component.html',
  styleUrls: ['./kot-dialog.component.scss'],
})
export class KotDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<KotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onCancel(): void {
    this.data = null;
    this.dialogRef.close();
  }

  selectKot(kotId: number) {
    if (this.selectedKots.includes(kotId)) {
      let index = this.selectedKots.indexOf(kotId);
      this.selectedKots.splice(index, 1);
    } else {
      this.selectedKots.push(kotId);
    }
    console.log(this.selectedKots);
  }
  selectedKots: number[] = [];
}
