import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { IPasswordChange } from './model/password';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  email: string | undefined;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.passwordData = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPasswords },
    );

    // Force revalidation when either field changes
    this.passwordData.get('newPassword')?.valueChanges.subscribe(() => {
      this.passwordData.updateValueAndValidity();
    });

    this.passwordData.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.passwordData.updateValueAndValidity();
    });

    this.passwordData.get('currentPassword')?.valueChanges.subscribe(() => {
      this.passwordData.updateValueAndValidity();
    });
  }

  passwordData!: FormGroup;

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  invalidPasswords = true;

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    const currentPassword = group.get('currentPassword');

    if (!newPassword || !confirmPassword) return null;

    const newVal = newPassword.value;
    const confirmVal = confirmPassword.value;
    const currentPasswordVal = currentPassword?.value;

    if (newVal !== confirmVal) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (newVal == currentPasswordVal) {
      currentPassword?.setErrors({ invalidPassword: true });
    } else if (newVal != currentPasswordVal) {
      currentPassword?.setErrors(null);
    } else {
      if (confirmPassword.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  changePassword(passwordData: IPasswordChange): void {
    this.authService.updatePassword(passwordData).subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);
        } else if (res.status) {
          console.log(res);
          this.snackbarService.success(res.message);
          localStorage.removeItem('access_token');
          if (res.access_token != null) {
            localStorage.setItem('access_token', res.access_token);
          } else {
            this.authService.clear();
          }
          this.router.navigate(['pizzashop/dashboard']);
        }
      },
    });
  }
}
