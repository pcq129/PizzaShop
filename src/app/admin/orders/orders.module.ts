import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OrderDetailsModule } from './order-details/order-details.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorComponent } from 'src/app/common/paginator/paginator.component';
import { SharedModule } from 'src/app/common/common-module.module';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    OrderDetailsModule,
    MatPaginatorModule,
    CommonModule,
    SharedModule
  ]
})
export class OrdersModule { }
