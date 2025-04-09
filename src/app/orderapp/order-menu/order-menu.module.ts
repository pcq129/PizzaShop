import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderMenuComponent } from './order-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderMenuComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
  ],
})
export class OrderMenuModule {}
