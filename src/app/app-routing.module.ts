import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/admin/containers/category/category.component';
import { LoginGuard } from './modules/auth/helper/login.guard';
// import { LayoutComponent } from './admin/app.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ForgotPasswordComponent } from './modules/auth/login/forgot-password/forgot-password.component';
import { DashboardComponent } from './modules/admin/containers/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { LoginFormComponent } from './modules/auth/login/login-form/login-form.component';
import { AppComponent } from './app.component';
import { TableSectionComponent } from './modules/admin/containers/table-section/table-section.component';
import { TaxFeesComponent } from './modules/admin/containers/tax-fees/tax-fees.component';
import { OrderappComponent } from './modules/app/orderapp.component';
import { OrderTablesComponent } from './modules/app/order-tables/order-tables.component';
import { OrderMenuComponent } from './modules/app/order-menu/order-menu.component';
import { OrdersComponent } from './modules/admin/containers/orders/orders.component';
import { OrderDetailsComponent } from './modules/admin/containers/orders/order-details/order-details.component';
import { CustomerComponent } from './modules/admin/containers/customer/customer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { WaitingListComponent } from './modules/app/waiting-list/waiting-list.component';
import { MenuComponent } from './modules/admin/containers/menu/menu.component';
import { ChangePasswordComponent } from './modules/admin/containers/change-password/change-password.component';
import { ProfileComponent } from './modules/admin/containers/profile/profile.component';
import { ResetPasswordComponent } from './modules/auth/login/reset-password/reset-password.component';
import { UsersComponent } from './modules/admin/containers/users/users.component';
import { KotComponent } from './modules/app/kot/kot.component';
import { RolePermissionComponent } from './modules/admin/containers/role-permission/role-permission.component';
import { Role } from './shared/interfaces/role';
import { AuthGuard } from './modules/auth/helper/auth.guard';
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
