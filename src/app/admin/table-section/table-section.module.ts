import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSectionComponent } from './table-section.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionDialog, SectionComponent, SectionDeleteDialog } from './section/section.component';
import { TableDeleteDialog, TableDialog, TablesComponent } from './tables/tables.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TableSectionComponent, SectionComponent, TablesComponent, SectionDialog, SectionDeleteDialog, TableDialog, TableDeleteDialog],
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
    MatSelectModule
  ],
})
export class TableSectionModule {}
