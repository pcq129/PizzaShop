import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SimpleCardComponent } from './simple-card/simple-card.component';

@NgModule({
  declarations: [DashboardComponent, SimpleCardComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
