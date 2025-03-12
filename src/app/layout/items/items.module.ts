import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { DeleteDialogModule } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.module';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ItemsService } from 'src/app/_services/items.service';
import { MatSelectModule } from '@angular/material/select';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { SharedModule } from 'src/app/common/common-module.module';

@NgModule({
  declarations: [ItemsComponent, ItemDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    DeleteDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ],
  exports: [ItemsComponent],
  providers: [ItemsService, CategoryListService, ],
})
export class ItemsModule {}
