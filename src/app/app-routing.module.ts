import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './admin/category/category.component';
import { ItemsComponent } from './admin/items/items.component';
import { AuthGuard } from 'src/helper/auth.guard';
// import { LayoutComponent } from './admin/app.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/login/forgot-password/forgot-password.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ModifierComponent } from './admin/modifier/modifier/modifier.component';
import { ModifierGroupComponent } from './admin/modifier/modifier-group/modifier-group.component';
import { LoginFormComponent } from './auth/login/login-form/login-form.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './admin/menu/menu.component';
import { TableSectionComponent } from './admin/table-section/table-section.component';
import { SectionComponent } from './admin/table-section/section/section.component';
import { TaxFeesComponent } from './admin/tax-fees/tax-fees.component';
import { OrderappComponent } from './orderapp/orderapp.component';
import { OrderTablesComponent } from './orderapp/order-tables/order-tables.component';
import { OrderMenuComponent } from './orderapp/order-menu/order-menu.component';
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
    canActivate: [AuthGuard],
    component: AdminComponent,
    // pathMatch: 'prefix',
    children: [
      {
        path: 'category',
        canActivate: [AuthGuard],
        component: CategoryComponent,
      },
      {
        path: 'menu',
        canActivate: [AuthGuard],
        component: MenuComponent,
      },
      {
        path: 'items',
        canActivate: [AuthGuard],
        component: ItemsComponent,
      },
      // {
      //   path: '',
      //   canActivate: [AuthGuard],
      //   component: DashboardComponent,
      //   pathMatch: 'full',
      // },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: MenuComponent,
        pathMatch: 'full',
      },
      {
        path: 'sections',
        canActivate: [AuthGuard],
        component: TableSectionComponent,
        pathMatch: 'full',
      },
      {
        path: 'modifiers',
        canActivate: [AuthGuard],
        component: ModifierComponent,
      },
      {
        path: 'modifiergroup',
        canActivate: [AuthGuard],
        component: ModifierGroupComponent,
      },{
        path: 'taxes-fees',
        canActivate: [AuthGuard],
        component: TaxFeesComponent,
      },
    ],
  },

  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
  },
  {
    path: 'order',
    component: OrderappComponent,
    children: [
      {
        path: 'menu',
        canActivate: [AuthGuard],
        component: OrderMenuComponent ,
      },
      {
        path: 'tables',
        canActivate: [AuthGuard],
        component: OrderTablesComponent ,
      },

    ]
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
    children: [
      {
        path: 'forgot-password',
        canActivate: [AuthGuard],
        component: ForgotPasswordComponent,
        pathMatch: 'full',
      },

      {
        path: '',
        // canActivate: [AuthGuard],
        component: LoginFormComponent,
        pathMatch: 'full',
      },

      {
        path: 'change-password',
        canActivate: [AuthGuard],
        component: LoginFormComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: OrderappComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   canActivate: [AuthGuard],
      //   component: MenuComponent,
      //   pathMatch: 'full',
      // },
      {
        path: 'login',
        canActivate: [AuthGuard],
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
