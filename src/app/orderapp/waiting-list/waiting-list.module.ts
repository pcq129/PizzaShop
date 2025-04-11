import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingListComponent } from './waiting-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    WaitingListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class WaitingListModule { }
