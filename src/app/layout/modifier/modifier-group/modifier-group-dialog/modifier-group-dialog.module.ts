import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierGroupDialogComponent } from './modifier-group-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [ModifierGroupDialogComponent],
  imports: [
     CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatOptionModule,
        ReactiveFormsModule,
        MatSelectModule,
  ]
})
export class ModifierGroupDialogModule { }
