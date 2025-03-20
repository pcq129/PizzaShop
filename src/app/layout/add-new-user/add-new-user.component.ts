import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  constructor(private route: Router) {}

  goBack() {
    this.route.navigate(['users']);
  }

  ngOnInit(): void {}

  newUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  email = this.newUserForm.controls.email;
  getEmailError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  password = this.newUserForm.controls.password;
  hide = true;
  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.password.hasError('pattern') ? 'Not a valid password' : '';
  }

  firstName = this.newUserForm.controls.firstName;
  lastName = this.newUserForm.controls.lastName;
  userName = this.newUserForm.controls.userName;
  country = this.newUserForm.controls.country;
  state = this.newUserForm.controls.state;
  city = this.newUserForm.controls.city;
  zipcode = this.newUserForm.controls.zipcode;
  address = this.newUserForm.controls.address;
  phone = this.newUserForm.controls.phone;
  role = this.newUserForm.controls.role;
}
