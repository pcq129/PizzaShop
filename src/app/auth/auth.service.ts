import { Injectable, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = this.LoggedIn();

  handleLogin() {
    this.isLoggedIn = true;
    // this.setItem('userId', email);
    // this.setItem('isLoggedIn', 'true');
    this.router.navigate(['dashboard']);
  }
  constructor(private router: Router) {}
  secretKey = '1234';
  id = 'user@user.com';
  password = '123456';

  checkCredentials(email: string, password: string) {
    if (email == this.id && password == this.password) {
      this.setItem('userCredential', { id: email, password: password });
      this.setItem('isLoggedIn', true);

      return true;
    }
    return false;
  }

  setItem(key: any, value: any = false) {
    let encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.secretKey
    ).toString();
    localStorage.setItem(key, encryptedValue);
  }

  decryptItem(value: any) {
    let decryptedValue = CryptoJS.AES.decrypt(value, this.secretKey);
  }

  clear() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.isLoggedIn = false;
  }

  LoggedIn() {
    if (localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['dashboard']);
      return true;
    } else {
      this.router.navigate(['login']);

      return false;
    }
  }
}
