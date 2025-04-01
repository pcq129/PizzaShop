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
import { HttpClientModule } from '@angular/common/http';
import { TableSectionModule } from './table-section/table-section.module';
import { TaxFeesComponent } from './tax-fees/tax-fees.component';
import { TaxFeesModule } from './tax-fees/tax-fees.module';

@NgModule({
  declarations: [LayoutComponent, ],
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    DashboardModule,
    TableSectionModule,
    MatButtonModule,
    HttpClientModule,
    TaxFeesModule
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
