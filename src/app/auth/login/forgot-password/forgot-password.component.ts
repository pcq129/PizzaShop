import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private router: Router){

  }

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  onSubmit() {
    this.router.navigate(['change-password']);
  }

  brandLogo = '../../assets/logos/brandLogo.png';
  login = '';
 

  //material components
  email = this.forgotPassword.controls.email;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
