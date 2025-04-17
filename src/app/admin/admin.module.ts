import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TableSectionModule } from './table-section/table-section.module';
import { TaxFeesComponent } from './tax-fees/tax-fees.component';
import { TaxFeesModule } from './tax-fees/tax-fees.module';
import { MatMenuModule } from '@angular/material/menu';
import { OrdersModule } from './orders/orders.module';
import { CustomerModule } from './customer/customer.module';
import { MenuModule } from './menu/menu.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    RouterModule,
    DashboardModule,
    TableSectionModule,
    MatButtonModule,
    HttpClientModule,
    TaxFeesModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    OrdersModule,
    CustomerModule,
    MenuModule,
    ChangePasswordModule,
    ProfileModule,
    UsersModule
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
