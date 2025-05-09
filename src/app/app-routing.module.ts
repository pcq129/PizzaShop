import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './admin/category/category.component';
import { LoginGuard } from 'src/helper/login.guard';
// import { LayoutComponent } from './admin/app.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/login/forgot-password/forgot-password.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginFormComponent } from './auth/login/login-form/login-form.component';
import { AppComponent } from './app.component';
import { TableSectionComponent } from './admin/table-section/table-section.component';
import { TaxFeesComponent } from './admin/tax-fees/tax-fees.component';
import { OrderappComponent } from './orderapp/orderapp.component';
import { OrderTablesComponent } from './orderapp/order-tables/order-tables.component';
import { OrderMenuComponent } from './orderapp/order-menu/order-menu.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderDetailsComponent } from './admin/orders/order-details/order-details.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { WaitingListComponent } from './orderapp/waiting-list/waiting-list.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ResetPasswordComponent } from './auth/login/reset-password/reset-password.component';
import { UsersComponent } from './admin/users/users.component';
import { KotComponent } from './orderapp/kot/kot.component';
import { RolePermissionComponent } from './admin/role-permission/role-permission.component';
import { Role } from './common/interfaces/role';
import { AuthGuard } from 'src/helper/auth.guard';
// import { DashboardComponent } from './app/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'pizzashop',
    canActivate: [AuthGuard, LoginGuard],
    component: AdminComponent,
    data: { roles: [Role.Super_Admin, Role.Account_Manager] },

    children: [
      {
        path: 'category',
        canActivate: [AuthGuard, LoginGuard],

        component: CategoryComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }
      },
      {
        path: 'menu',
        canActivate: [AuthGuard, LoginGuard],

        component: MenuComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: '',
        canActivate: [AuthGuard, LoginGuard],
        component: DashboardComponent,
        pathMatch: 'full',
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard, LoginGuard],
        component: DashboardComponent,
        pathMatch: 'full',
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'sections',
        canActivate: [AuthGuard, LoginGuard],
        component: TableSectionComponent,
        pathMatch: 'full',
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }
      },
      {
        path: 'taxes-fees',
        canActivate: [AuthGuard, LoginGuard],
        component: TaxFeesComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'orders',
        canActivate: [AuthGuard, LoginGuard],
        component: OrdersComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'role-permissions',
        canActivate: [AuthGuard],
        component: RolePermissionComponent,
        data: { roles: [Role.Super_Admin] }
      },
      {
        path: 'orders/details',
        canActivate: [AuthGuard, LoginGuard],
        component: OrderDetailsComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'customers',
        canActivate: [AuthGuard, LoginGuard],
        component: CustomerComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }
      },
      {
        path: 'profile-password',
        canActivate: [AuthGuard, LoginGuard],
        component: ChangePasswordComponent,
        pathMatch: 'full',
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, LoginGuard],
        component: ProfileComponent,
        pathMatch: 'full',
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }
      },
      {
        path: 'users',
        canActivate: [AuthGuard, LoginGuard],
        component: UsersComponent,
        pathMatch: 'full',
        data: { roles: [Role.Super_Admin] }
      },
    ],
  },


  {
    path: 'orderapp',
    component: OrderappComponent,
    children: [
      {
        path: 'menu',
        canActivate: [AuthGuard, LoginGuard],
        component: OrderMenuComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'tables',
        canActivate: [AuthGuard, LoginGuard],
        component: OrderTablesComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'running',
        canActivate: [AuthGuard, LoginGuard],
        component: OrderTablesComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'waiting-list',
        canActivate: [AuthGuard, LoginGuard],
        component: WaitingListComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager] }

      },
      {
        path: 'kot',
        canActivate: [AuthGuard, LoginGuard],
        component: KotComponent,
        data: { roles: [Role.Super_Admin, Role.Account_Manager, Role.Chef] }

      },
      {
        path: 'profile-password',
        canActivate: [AuthGuard, LoginGuard],
        component: ChangePasswordComponent,
        pathMatch: 'full',
        data: { roles: [Role.Chef] }
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, LoginGuard],
        component: ProfileComponent,
        pathMatch: 'full',
        data: { roles: [Role.Chef] }
      },
    ],
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
    children: [
      {
        path: 'forgot-password',
        canActivate: [LoginGuard],
        component: ForgotPasswordComponent,
        pathMatch: 'full',
      },

      {
        path: '',
        // canActivate: [LoginGuard],
        component: LoginFormComponent,
        pathMatch: 'full',
      },

      {
        path: 'change-password',
        canActivate: [LoginGuard],
        component: ResetPasswordComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    canActivate: [LoginGuard],
    component: PageNotFoundComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
