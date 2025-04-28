import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  profileForm!: FormGroup;

  constructor(private authService: AuthService, private snackbarService : SnackbarService, private router : Router) {

  }

  ngOnInit(): void {
    this.authService.fetchUserData();
    this.authService.user$.subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData);

      setTimeout(() => {
              this.initProfileForm();
      }, 500);

    });
  }

  initProfileForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.userData.first_name, [Validators.required]),
      lastName: new FormControl(this.userData.last_name, [Validators.required]),
      username: new FormControl(this.userData.user_name, [Validators.required]),
      phone: new FormControl(this.userData.phone, Validators.required),
      country: new FormControl(this.userData.country, Validators.required),
      state: new FormControl(this.userData.state, Validators.required),
      city: new FormControl(this.userData.city, Validators.required),
      address: new FormControl(this.userData.address, Validators.required),
      zipcode: new FormControl(this.userData.zipcode, Validators.required),
    });
  }

  cancel(){
    this.router.navigate(['dashboard']);
  }

  updateProfile(){

    let data = this.profileForm.value;
    console.log(data);
    this.authService.updateProfile(data).subscribe({
      next: (res: any)=>{
        if(res.status == "true"){
          this.snackbarService.success(res.message);
          localStorage.setItem('access_token', res.data);
          this.router.navigate(['dashboard']);
        }
        else if(res.status == "false"){
          this.snackbarService.error(res.message);
        }
      }
    })
  }
}
