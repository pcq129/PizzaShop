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
import { MenuModule } from './menu/menu.module';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LayoutComponent, TableComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    DashboardModule,
    MenuModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
