import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ModifierGroupComponent } from './modifier-group.component';
import { ModifierGroupDialogComponent } from './modifier-group-dialog/modifier-group-dialog.component';
import { ModifierGroupDialogModule } from './modifier-group-dialog/modifier-group-dialog.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ModifierGroupComponent],
  imports: [
    CommonModule,
    ModifierGroupDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ModifierGroupModule {}
