import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTablesComponent } from './order-tables.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';


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
    MatCardModule
  ]
})
export class OrderTablesModule { }
