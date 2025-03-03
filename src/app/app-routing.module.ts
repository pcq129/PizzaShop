import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './layout/menu/menu.component';
import { ItemsComponent } from './layout/items/items.component';
import { AuthGuard } from 'src/helper/auth.guard';
// import { LayoutComponent } from './layout/app.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/login/forgot-password/forgot-password.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
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
    children: [
      {
        path: 'category',
        canActivate: [AuthGuard],
        component: MenuComponent,
      },
      {
        path: 'items',
        canActivate: [AuthGuard],
        component: ItemsComponent,
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
    ],
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
    children: [
      // {
      //   path: 'forgot-password',
      //   canActivate: [AuthGuard],
      //   component: ForgotPasswordComponent,
      // },
    ],
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: LayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
