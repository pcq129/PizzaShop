import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

// const routes: Routes = [
//   {
//     path: 'forgot-password',
//     canActivate: [LoginGuard],
//     component: ForgotPasswordComponent,
//     pathMatch: 'full',
//   },
//   {
//     path: '',
//     canActivate: [LoginGuard],
//     component: LoginFormComponent,
//     pathMatch: 'full',
//   },
// ];

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    // RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    AuthService,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
