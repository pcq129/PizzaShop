import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  email: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  passwordData = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [this.checkPasswords]
  );

  changePassword(e: any) {
    console.log(e);
  }

  redirect(url: string) {
    this.router.navigate(['dashboard']);
  }

  invalidPasswords = true;

  checkPasswords(passwordData: AbstractControl): ValidationErrors | null {
    const newPassword = passwordData.get('newPassword')?.value;
    const confirmPassword = passwordData.get('confirmPassword')?.value;
    if (newPassword != confirmPassword) {
      console.log('mismatch');
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
