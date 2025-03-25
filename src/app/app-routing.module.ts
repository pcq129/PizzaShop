import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './layout/category/category.component';
import { ItemsComponent } from './layout/items/items.component';
import { AuthGuard } from 'src/helper/auth.guard';
// import { LayoutComponent } from './layout/app.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/login/forgot-password/forgot-password.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ModifierComponent } from './layout/modifier/modifier/modifier.component';
import { ModifierGroupComponent } from './layout/modifier/modifier-group/modifier-group.component';
import { LoginFormComponent } from './auth/login/login-form/login-form.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
// import { DashboardComponent } from './app/dashboard/dashboard.component';
const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   title: 'Welcome | E-com',
  //   loadChildren: () =>
  //     import('./layout/layout.module').then((m) => m.LayoutModule)
  // },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
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
        component: ModifierComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'dashboard',
      //   canActivate: [AuthGuard],
      //   component: DashboardComponent,
      //   pathMatch: 'full',
      // },
      {
        path: 'modifiers',
        canActivate: [AuthGuard],
        component: ModifierComponent,
      },
      {
        path: 'modifiergroup',
        canActivate: [AuthGuard],
        component: ModifierGroupComponent,
      },
    ],
  },

  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
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
    component: LayoutComponent,
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
