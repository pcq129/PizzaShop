import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { SnackbarService } from 'src/app/common/_services/snackbar.service';
import { UserService } from '../users/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  profileForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.authService.role$.subscribe({
      next: (res: string | null) => {
        if (res) {
          this.role = res;
        }
      },
    });
    this.getCountries();
    this.getUserData();
  }

  ngOnInit(): void {
    // this.authService.user$.subscribe((res: any) => {
    //   this.userData = res;
    //   console.log(this.userData);

    // });
    setTimeout(() => {
      this.initProfileForm();
    }, 1000);
  }

  getUserData() {
    this.authService.fetchUserData().subscribe((res: any) => {
      this.userData = res;
      this.getStates(res.country);
      this.getCities(res.state);
      console.log(this.userData);
    });
  }

  getCountries(countryId?: number) {
    this.userService.getCountries(countryId).subscribe((res: any) => {
      this.countries = res.data;
    });
  }

  getStates(countryId: number) {
    // this.profileForm.controls['state']?.setValue(null);
    // this.profileForm.controls['city']?.setValue(null);
    this.userService.getStates(countryId).subscribe((res: any) => {
      this.states = res.data;
    });
  }

  getCities(stateId: number) {
    // this.profileForm.controls['city']?.setValue(null);
    this.userService.getCities(stateId).subscribe((res: any) => {
      this.cities = res.data;
    });
  }

  initProfileForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.userData.first_name, [
        Validators.required,
      ]),
      lastName: new FormControl(this.userData.last_name, [Validators.required]),
      username: new FormControl(this.userData.user_name, [Validators.required]),
      phone: new FormControl(this.userData.phone, Validators.required),
      country: new FormControl(this.userData.country, Validators.required),
      state: new FormControl(this.userData.state, Validators.required),
      city: new FormControl(this.userData.city, Validators.required),
      address: new FormControl(this.userData.address, Validators.required),
      zipcode: new FormControl(this.userData.zipcode, Validators.required),
    });

    console.log(this.profileForm);
  }

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  cancel() {
    this.router.navigate(['pizzashop/dashboard']);
  }
  role: string = '';

  updateProfile() {
    let data = this.profileForm.value;
    console.log(data);
    this.authService.updateProfile(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.snackbarService.success(res.message);
          localStorage.setItem('access_token', res.data);
          this.router.navigate(['pizzashop/dashboard']);
        } else if (!res.status) {
          this.snackbarService.error(res.message);
        }
      },
    });
  }
}
