import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderappComponent } from './orderapp.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { OrderTablesModule } from './order-tables/order-tables.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WaitingListModule } from './waiting-list/waiting-list.module';
import { KotModule } from './kot/kot.module';


@NgModule({
  declarations: [
    OrderappComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    OrderTablesModule,
    RouterModule,
    HttpClientModule,
    WaitingListModule,
    KotModule
  ],
})
export class OrderappModule { }
