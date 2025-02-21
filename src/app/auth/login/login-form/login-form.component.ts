import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { Validators, FormControl, FormGroup } from '@angular/forms';

interface userCred {
  email: string;
  password: string;
}

@Component({
  selector: 'login-Form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor() {}
  brandLogo = '../../assets/logos/brandLogo.png';

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  User1: userCred = {
    email: 'user@gmail.com',
    password: '123456',
  };

  forgotPassword = '/forgotpassword';
  isInputValid(value: any) {
    this.isFormValid = value;
  }

  isFormValid: boolean = false;

  onSubmit() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    if (email == this.User1.email && password == this.User1.password) {
      alert('success');
    } else {
      alert('not valid');
    }
  }
}
