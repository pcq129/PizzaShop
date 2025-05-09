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
import { SectionDialog, SectionDeleteDialog } from './table-section.component';
import { TableDeleteDialog, TableDialog } from './table-section.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorComponent } from 'src/app/common/paginator/paginator.component';
import { SharedModule } from 'src/app/common/common-module.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TableSectionComponent, SectionDialog, SectionDeleteDialog, TableDialog, TableDeleteDialog],
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
    SharedModule,
    MatCheckboxModule
  ],
})
export class TableSectionModule {}
