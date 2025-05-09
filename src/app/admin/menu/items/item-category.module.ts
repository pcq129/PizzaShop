import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCategoryComponent } from './item-category.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeleteDialogModule } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.module';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { categoryDialogComponent } from './category-dialog/category-dialog.component';
import { SharedModule } from 'src/app/common/common-module.module';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    ItemCategoryComponent,
    ItemDialogComponent,
    categoryDialogComponent,
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
    MatPaginatorModule
  ],
  exports: [ItemCategoryComponent],
})
export class ItemCategoryModule {}
