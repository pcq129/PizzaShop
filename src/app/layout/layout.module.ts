import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from '../header/header.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { ModifierModule } from './modifier/modifier/modifier.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    DashboardModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
