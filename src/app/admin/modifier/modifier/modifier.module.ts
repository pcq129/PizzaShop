import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ModifierComponent } from './modifier.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModifierDialogModule } from './modifierDialog/modifierDialog.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { modifierDeleteDialog } from './modifier-delete-dialog/modifier-delete-dialog.module';
import { ModifierGroupComponent } from '../modifier-group/modifier-group.component';
import { ModifierGroupModule } from '../modifier-group/modifier-group.module';
import { SharedModule } from 'src/app/common/common-module.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ModifierComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ModifierDialogModule,
    MatIconModule,
    modifierDeleteDialog,
    ModifierGroupModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
  ],
  exports: [],
})
export class ModifierModule {}
