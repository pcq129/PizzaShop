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
import { SectionComponent } from './admin/table-section/section/section.component';
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
// import { DashboardComponent } from './app/dashboard/dashboard.component';
const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   title: 'Welcome | E-com',
  //   loadChildren: () =>
  //     import('./admin/layout.module').then((m) => m.LayoutModule)
  // },
  {
    path: '',
    canActivate: [LoginGuard],
    component: AdminComponent,
    // pathMatch: 'prefix',
    children: [
      {
        path: 'category',
        canActivate: [LoginGuard],
        component: CategoryComponent,
      },
      {
        path: 'menu',
        canActivate: [LoginGuard],
        component: MenuComponent,
      },
      {
        path: '',
        canActivate: [LoginGuard],
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [LoginGuard],
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'sections',
        canActivate: [LoginGuard],
        component: TableSectionComponent,
        pathMatch: 'full',
      },
      {
        path: 'taxes-fees',
        canActivate: [LoginGuard],
        component: TaxFeesComponent,
      },
      {
        path: 'orders',
        canActivate: [LoginGuard],
        component: OrdersComponent,
      },
      {
        path: 'role-permissions',
        canActivate: [LoginGuard],
        component: RolePermissionComponent  ,
      },
      {
        path: 'orders/details',
        canActivate: [LoginGuard],
        component: OrderDetailsComponent,
      },
      {
        path: 'customers',
        canActivate: [LoginGuard],
        component: CustomerComponent,
      },
      {
        path: 'profile-password',
        canActivate: [LoginGuard],
        component: ChangePasswordComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile',
        canActivate: [LoginGuard],
        component: ProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        canActivate: [LoginGuard],
        component: UsersComponent,
        pathMatch: 'full',
      },
    ],
  },

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: AppComponent,
  // },
  {
    path: 'orderapp',
    component: OrderappComponent,
    children: [
      {
        path: 'menu',
        canActivate: [LoginGuard],
        component: OrderMenuComponent,
      },
      {
        path: 'tables',
        canActivate: [LoginGuard],
        component: OrderTablesComponent,
      },
      {
        path: 'running',
        canActivate: [LoginGuard],
        component: OrderTablesComponent,
      },
      {
        path: 'waiting-list',
        canActivate: [LoginGuard],
        component: WaitingListComponent,
      },
      {
        path: 'kot',
        canActivate: [LoginGuard],
        component: KotComponent,
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
    children: [
      // {
      //   path: 'dashboard',
      //   canActivate: [LoginGuard],
      //   component: MenuComponent,
      //   pathMatch: 'full',
      // },
      {
        path: 'login',
        canActivate: [LoginGuard],
        component: DashboardComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
