import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './containers/dashboard/dashboard.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TableSectionModule } from './containers/table-section/table-section.module';
import { TaxFeesModule } from './containers/tax-fees/tax-fees.module';
import { MatMenuModule } from '@angular/material/menu';
import { OrdersModule } from './containers/orders/orders.module';
import { CustomerModule } from './containers/customer/customer.module';
import { MenuModule } from './containers/menu/menu.module';
import { ChangePasswordModule } from './containers/change-password/change-password.module';
import { ProfileModule } from './containers/profile/profile.module';
import { UsersModule } from './containers/users/users.module';
import { RolePermissionModule } from './containers/role-permission/role-permission.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    DashboardModule,
    TableSectionModule,
    TaxFeesModule,
    MatMenuModule,
    OrdersModule,
    CustomerModule,
    MenuModule,
    ChangePasswordModule,
    ProfileModule,
    UsersModule,
    RolePermissionModule
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
