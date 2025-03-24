import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthService } from '../../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/_services/snackbar.service';

interface Alert {
  type: string;
  message: string;
}

let invalidCredentials: Alert = {
  type: 'danger',
  message: 'Invalid credentials',
};

@Component({
  selector: 'login-Form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  generateAlert(): any {}
  alerts: any = invalidCredentials;

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  alertState = false;

  //regular component
  hide: boolean = true;
  constructor(private snackbar: SnackbarService,private _snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    const url = router.url;
    // console.log(url);
  }
  brandLogo = '../../assets/logos/brandLogo.png';

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  email = this.loginForm.controls.email;
  password = this.loginForm.controls.password;

  // relocate verification logic to auth service
  // @Output()
  // credentials = {
  //   email: this.email,
  //   password: this.password,
  // };

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  userCredentials: any = null;

  onSubmit() {
    let email = this.email.value;
    let password = this.password.value;

    console.log(email, password);
    if (email && password) {
      this.authService
        .checkCredentials(email!, password!)
        .subscribe((res: any) => {
          this.userCredentials = res;
          this.snackbar.success("Login Successful");
          console.log(res);
          this.authService.handleLogin(this.userCredentials);
        }, (error)=>{
          //   this.alertState = true;
          // setTimeout(() => {
          //   this.alertState = false;
          // }, 2000)
          console.log(error);
          this.snackbar.error(error.error.error);
        });
    } else {
    }
  }
}
