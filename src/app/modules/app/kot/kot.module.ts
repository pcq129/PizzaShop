import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KotComponent } from './kot.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { KotDialogComponent } from './kot-dialog/kot-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [KotComponent, KotDialogComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class KotModule {}
