import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

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
    this.authService.requestReset(forgotPassword).subscribe({
      next: (res: any)=>{
        if(res.status == "passwords.sent"){
          this.snackbarService.success("Reset link sent successfully");
          this.router.navigate(['login']);

        }
        else{
          this.snackbarService.error("Error Occured");

        }
        console.log(res);

      },
      error: (err)=>{
        console.log(err);

      }
    })
  }
}
