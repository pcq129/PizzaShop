import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryComponent } from './category.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ItemsService } from 'src/app/_services/items.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogModule } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.module';
import { CommonDialogModule } from './common-dialog/common-dialog.module';

@NgModule({
  declarations: [CategoryComponent  ],
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
    CommonDialogModule,
  ],
  exports: [CategoryComponent],
  providers: [CategoryListService],
})
export class CategoryModule {}
