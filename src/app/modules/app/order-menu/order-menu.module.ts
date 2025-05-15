import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderMenuComponent } from './order-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { modifierDialog } from './modifier-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { ConfirmationDialogModule } from 'src/app/common/components/dialogs/confirmation-dialog/confirmation-dialog.module';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';


@NgModule({
  declarations: [OrderMenuComponent, modifierDialog, RatingDialogComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatRadioModule,
    ConfirmationDialogModule
  ],
  exports:[]
})
export class OrderMenuModule {}
