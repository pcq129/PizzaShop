import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  email: any;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.passwordData = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPasswords }
    );

    // Force revalidation when either field changes
    this.passwordData.get('newPassword')?.valueChanges.subscribe(() => {
      this.passwordData.updateValueAndValidity();
    });

    this.passwordData.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.passwordData.updateValueAndValidity();
    });
  }

  passwordData!: FormGroup;

  redirect(url: string) {
    this.router.navigate([url]);
  }

  invalidPasswords = true;

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');

    if (!newPassword || !confirmPassword) return null;

    const newVal = newPassword.value;
    const confirmVal = confirmPassword.value;

    if (newVal !== confirmVal) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      // only clear if previously set by this validator
      if (confirmPassword.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  changePassword(passwordData: any) {
    this.authService.updatePassword(passwordData).subscribe({
      next: (res: any) => {
        if (res.status == 'false') {
          this.snackbarService.error(res.message);
        } else if (res.status == 'true') {
          this.snackbarService.success(res.message);
          localStorage.setItem('access_token', res.data);
          // this.authService.clear();
        }
      },
    });
  }
}
