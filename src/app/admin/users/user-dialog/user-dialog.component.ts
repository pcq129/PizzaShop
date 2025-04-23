import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modifierDialog } from 'src/app/orderapp/order-menu/modifier-dialog.component';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../users.component.scss'],
})
export class UserDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<modifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.passwords = this.data.passwords;

    this.userForm = new FormGroup(
      {
        first_name: new FormControl(this.data.userData?.first_name, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        last_name: new FormControl(this.data.userData?.last_name, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        username: new FormControl(this.data.userData?.user_name, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        email: new FormControl(this.data.userData?.email, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl((this.data.userData?.phone.replace(/\D/g, '')), Validators.required),
        country: new FormControl(this.data.userData?.country, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        state: new FormControl(this.data.userData?.state, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        city: new FormControl(this.data.userData?.city, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        address: new FormControl(this.data.userData?.address, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        zipcode: new FormControl(this.data.userData?.zipcode, [
          Validators.required,
          this.whitespaceValidator,
        ]),
        password: new FormControl('', [
          Validators.required,
          this.whitespaceValidator,
        ]),
        confirmPassword: new FormControl('', [this.whitespaceValidator, Validators.required]),
        role: new FormControl(`${this.data.userData?.role}`, [Validators.required]),
      },
      { validators: this.checkPasswords }
    );
    if (this.data.passwords == false) {
      this.passwords = false;
      this.userForm.controls.password.clearValidators();
      this.userForm.controls.confirmPassword. Validators;
      this.userForm.setValidators(null);
    }
  }
  ngOnInit(): void {}


  userData: any = [];
  onNoClick(): void {
    this.userForm.reset();
    this.dialogRef.close();
  }

  passwords: boolean = true;

  userForm: any;

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const newPassword = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!newPassword || !confirmPassword) return null;

    const newVal = newPassword.value;
    const confirmVal = confirmPassword.value;

    if (newVal !== confirmVal) {
      console.log("setting passwordMismatch");

      confirmPassword.setErrors({ passwordMismatch: true });

    } else {
      // only clear if previously set by this validator
      if (confirmPassword.hasError('passwordMismatch')) {
      console.log("unset");
        confirmPassword.setErrors(null);
      }
    }

    return null;
  }

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (String(control.value || '')).trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getUsernameError() {
    if (this.userForm.controls.username.hasError('required')) {
      return 'You must enter a username';
    }
    if (this.userForm.controls.username.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getFirstNameError() {
    if (this.userForm.controls.first_name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.userForm.controls.first_name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getLastNameError() {
    if (this.userForm.controls.last_name.hasError('required')) {
      return 'You must enter last name';
    }
    if (this.userForm.controls.last_name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getEmailError() {
    if (this.userForm.controls.email.hasError('required')) {
      return 'You must enter an email';
    }
    if (this.userForm.controls.email.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getPhoneError() {
    if (this.userForm.controls.phone.hasError('required')) {
      return 'You must enter a phone number';
    }
    if (this.userForm.controls.phone.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getCountryError() {
    // if (this.userForm.controls.country.hasError('required')) {
    //   return 'Please enter county name';
    // }
    if (this.userForm.controls.country.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getStateError() {
    // if (this.userForm.controls.state.hasError('required')) {
    //   return '';
    // }
    if (this.userForm.controls.state.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getCityError() {
    // if (this.userForm.controls.city.hasError('required')) {
    //   return 'You must enter a name';
    // }
    if (this.userForm.controls.city.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getAddressError() {
    if (this.userForm.controls.address.hasError('required')) {
      return 'You must enter an address';
    }
    if (this.userForm.controls.address.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }
  getZipcodeError() {
    if (this.userForm.controls.zipcode.hasError('required')) {
      return 'You must a zip code';
    }
    if (this.userForm.controls.zipcode.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }


  getConfirmPasswordError() {
    const confirmControl = this.userForm.controls.confirmPassword;
    if (confirmControl.hasError('required')) {
      return 'You must confirm your password';
    }
    if (confirmControl.hasError('whitespace')) {
      return 'Invalid input';
    }
    if (confirmControl.hasError('passwordMismatch')) {
      return "Passwords don't match";
    }
    return;
  }


  getRoleError() {
    if (this.userForm.controls.city.hasError('required')) {
      return 'You must select a role';
    }
    return;
  }
}
