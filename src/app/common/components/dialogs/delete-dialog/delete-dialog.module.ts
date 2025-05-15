import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
})
export class DeleteDialogModule {}
