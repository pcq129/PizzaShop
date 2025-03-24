import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getToken(){
    return localStorage.getItem('access_token');
  }

  access_token: string | null = this.getToken();

  // solution of login session ending on refresh by senior
  // isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  // private hasToken(): boolean {
  //   return !!localStorage.getItem('access_token');
  // }

  //test implementation
  isLoggedIn: boolean = this.checkLoggedIn(this.access_token!);

  handleLogin(data: any) {
    this.isLoggedIn = true;
    this.setItem('access_token', data.access_token);
    // this.isLoggedIn.next(true);
    // this.setItem('userId', email);
    // this.setItem('isLoggedIn', 'true');
    this.router.navigate(['dashboard']);
  }
  constructor(private router: Router, private http: HttpClient) {}
  secretKey = '1234';
  id = 'user@user.com';
  password = '123456';

  checkCredentials(email: string, password: string) {
    let data = {
      email: email,
      password: password,
    };
    return this.http.post(environment.baseURL + `login`, data);
  }

  setItem(key: any, value: any = false) {
    let encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.secretKey
    ).toString();
    localStorage.setItem(key, encryptedValue);
  }

  clear() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  checkLoggedIn(token: string) {
    console.log('checkedLoggedIn');

    if (localStorage.getItem('access_token') && this.checkValidity(token)) {
      this.router.navigate(['dashboard']);
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // createLoginAuthorizationHeader() {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('X-Authentication', this.UserInfo.Token);
  //   headers = headers.append('Content-Type', 'application/json');
  //   return headers;
  // }

  checkValidity(token: string) {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.access_token}`,
    });
    console.log(httpHeaders);
    console.log(token);

    return this.http.post(
      environment.baseURL + `me`,
      {},
      { headers: httpHeaders }
    );

    // .subscribe((res)=>{
    //   console.log(res);
    //   console.log(validity);
    //   if (data) {
    //     console.log(data);
    //     validity = true;
    //   } else {
    //     validity = false;
    //   }
    //   console.log(validity);
    //   debugger;

    // });
  }
}
