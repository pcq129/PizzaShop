import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierComponent } from './modifier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { DeleteDialogModule } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.module';

import { ModifierGroupDialogComponent } from './dialog/modifier-group-dialog/modifier-group-dialog.component';
import { modifierDialog } from './dialog/modifier-dialog/modifier-dialog.component';
import { SharedModule } from 'src/app/shared/shared-module.module';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ModifierComponent,
    ModifierGroupDialogComponent,
    modifierDialog,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    DeleteDialogModule,
    SharedModule,
    MatCheckboxModule,
  ],
  exports: [ModifierComponent],
})
export class ModifierModule {}
