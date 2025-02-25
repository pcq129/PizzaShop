import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  secretKey = '1234';
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
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }

  isLoggedIn: boolean = true; //set to false in demo sessions
}
