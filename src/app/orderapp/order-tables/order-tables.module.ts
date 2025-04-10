import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTablesComponent } from './order-tables.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import {  MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { OrderMenuModule } from '../order-menu/order-menu.module';
import { OrderService } from '../order-service.service';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    OrderTablesComponent
  ],
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
    MatRadioModule
  ],
  providers: [OrderService]

})
export class OrderTablesModule { }
