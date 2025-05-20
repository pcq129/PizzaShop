import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTablesComponent } from './order-tables.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { OrderMenuModule } from '../order-menu/order-menu.module';
import { OrderService } from '../../admin/containers/orders/_services/order.service';
import { MatRadioModule } from '@angular/material/radio';
import { waitingTokenDialog } from './dialogs/waitingTokenDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogModule } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.module';

@NgModule({
  declarations: [OrderTablesComponent, waitingTokenDialog],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    OrderMenuModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    DeleteDialogModule,
  ],
  providers: [OrderService],
})
export class OrderTablesModule {}
