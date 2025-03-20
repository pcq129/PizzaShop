import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSectionComponent } from './table-section.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';

@NgModule({
  declarations: [TableSectionComponent,],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
})
export class TableSectionModule {}
