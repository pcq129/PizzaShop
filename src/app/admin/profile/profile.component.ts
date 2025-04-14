import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((res: any) => {
      this.userData = res;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.userData.first_name, [
          Validators.required,
        ]),
        lastName: new FormControl(this.userData.last_name, [
          Validators.required,
        ]),
        username: new FormControl(this.userData.user_name, [
          Validators.required,
        ]),
        phone: new FormControl(this.userData.phone, Validators.required),
        country: new FormControl(this.userData.country, Validators.required),
        state: new FormControl(this.userData.state, Validators.required),
        city: new FormControl(this.userData.city, Validators.required),
        address: new FormControl(this.userData.address, Validators.required),
        zipcode: new FormControl(this.userData.zipcode, Validators.required),
      });

      this.profileForm.patchValue({
        firstName: res.first_name,
        lastName: res.last_name,
        username: res.user_name,
        phone: res.phone,
        country: res.country,
        state: res.state,
        city: res.city,
        address: res.address,
        zipcode: res.zipcode,
      });
    });
  }

  userData: any = [];
  ngOnInit(): void {};
  profileForm: any;



  // profileForm: any;
  // getUserData() {
  //   this.authService.getUserData().subscribe({
  //     next: (res) => {
  //       this.userData = res;
  //       console.log(res);

  //       this.profileForm = new FormGroup({
  //         firstName: new FormControl(this.userData.first_name, [
  //           Validators.required,
  //         ]),
  //         lastName: new FormControl(this.userData.last_name, [
  //           Validators.required,
  //         ]),
  //         username: new FormControl(this.userData.user_name, [
  //           Validators.required,
  //         ]),
  //         phone: new FormControl(this.userData.phone, Validators.required),
  //         country: new FormControl(this.userData.country, Validators.required),
  //         state: new FormControl(this.userData.state, Validators.required),
  //         city: new FormControl(this.userData.city, Validators.required),
  //         address: new FormControl(this.userData.address, Validators.required),
  //         zipcode: new FormControl(this.userData.zipcode, Validators.required),
  //       });
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // {
  //   "phone": "914-985-7465",
  //   "email": "user@user.com",
  //   "first_name": "Dulce",
  //   "last_name": "Rutherford",
  //   "user_name": "swaniawski.hailee",
  //   "address": "651 Douglas Walk Suite 858\nPagacside, NV 19200",
  //   "country": "Kenya",
  //   "state": "Gujarat",
  //   "city": "Ahmedabad",
  //   "zipcode": 380041,
  //   "role": "user",
  //   "remember_token": "94x69kS4je"
  // }
}
