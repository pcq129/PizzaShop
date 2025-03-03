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
import { ModifierComponent } from './modifier/modifier.component';
// import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [LayoutComponent, ModifierComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    // LayoutRoutingModule,
    DashboardModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
