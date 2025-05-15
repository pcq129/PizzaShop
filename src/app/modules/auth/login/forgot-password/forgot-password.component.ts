import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SnackbarService } from 'src/app/common/_services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private router: Router, private authService : AuthService, private snackbarService : SnackbarService){

  }

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

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


  requestReset(forgotPassword : any){
    this.snackbarService.info('Checking Email')
    this.authService.requestReset(forgotPassword).subscribe({
      next: (res: any)=>{
        if(res.status == "passwords.sent"){
          this.snackbarService.success("Reset link sent successfully");
          this.router.navigate(['login']);

        }
        else if(res.status == "passwords.user"){
          this.snackbarService.error("User not found");
          console.log(res);
        }
        else if(res.status == "passwords.throttled"){
          this.snackbarService.info("Too many requests, Please try again later");
          console.log(res);
        }
        else{
          this.snackbarService.error("Error")
        }

      },
      error: (err)=>{
        console.log(err);

      }
    })
  }
}
