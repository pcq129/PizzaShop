import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  onSubmit() {
    console.log('null');
  }

  brandLogo = '../../assets/logos/brandLogo.png';
  login = '';
  redirect() {}

  newPassword: string = '';
  confirmNewPassword: string = '';
}
