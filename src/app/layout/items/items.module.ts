import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
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
  ],
  exports: [ItemsComponent],
  providers: [ItemsService],
})
export class ItemsModule {}
