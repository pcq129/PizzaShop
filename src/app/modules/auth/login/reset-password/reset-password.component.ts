import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  // email: any;

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.passwordData = new FormGroup(
      {
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
    this.token = this.activatedRoute.snapshot.params['token'];
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  brandLogo = '../../assets/logos/brandLogo.png';

  passwordData!: FormGroup;
  email: string = '';
  token: any;

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
  params = new URLSearchParams(document.location.search);

  changePassword(passwordData: any) {
    let token = this.params.get('token');
    let email = this.params.get('email');
    let data = {
      email: email,
      password: passwordData.newPassword,
      password_confirmation: passwordData.confirmPassword,
      token: token,
    };

    this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
        if (res.status != 'passwords.reset') {
          this.snackbarService.error('Error occured');
        } else if (res.status == 'passwords.reset') {
          this.snackbarService.success('Password reset successfully');
          this.redirect('login');
          this.authService.clear();
        }
      },
    });
  }
}
