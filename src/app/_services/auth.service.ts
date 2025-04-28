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

  constructor(private router: Router, private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  access_token: string | null = this.getToken();
  role: string|null = this.getRole();

  // solution of login session ending on refresh by senior
  // isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  // private hasToken(): boolean {
  //   return !!localStorage.getItem('access_token');
  // }

  //test implementation
  isLoggedIn = localStorage.getItem('isLoggedIn');
  // role = localStorage.getItem('role');
  // this.checkLoggedIn(this.access_token!);

  handleLogin(data: any) {
    this.isLoggedIn = '1';
    this.setItem('access_token', data.access_token);
    this.setItem('isLoggedIn', '1');
    this.setItem('role', data.role[0].name);
    if(data.role[0].name=='chef'){
      this.router.navigate(['orderapp/kot']);
    }else{
      this.router.navigate(['dashboard']);
    }
  }

  checkCredentials(email: string, password: string) {
    let data = {
      email: email,
      password: password,
    };
    return this.http.post(environment.baseURL + `login`, data);
  }

  requestReset(data: any) {
    console.log(data);

    return this.http.post(environment.baseURL + 'forgot-password', data);
  }

  resetPassword(data: any) {
    console.log(data);
    return this.http.post(environment.baseURL + 'password/reset', data);
  }

  setItem(key: any, value: any = false) {
    localStorage.setItem(key, value);
  }

  clear() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  checkLoggedIn(token: string) {
    if (
      this.router.url == 'login/change-password' ||
      this.router.url == 'login/reset-password'
    ) {
      return false;
    }
    if (localStorage.getItem('isLoggedIn') == '1') {
      // this.router.navigate(['dashboard']);
      return true;
    } else {
      // this.router.navigate(['login']);
      return false;
    }
  }

  // createLoginAuthorizationHeader() {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('X-Authentication', this.UserInfo.Token);
  //   headers = headers.append('Content-Type', 'application/json');
  //   return headers;
  // }

  // checkValidity(token: string) {
  //   let httpHeaders = new HttpHeaders({
  //     Authorization: `Bearer ${this.access_token}`,
  //   });
  //   console.log(httpHeaders);
  //   console.log(token);

  //   return this.http.get(environment.baseURL + `me`, { headers: httpHeaders });
    // .subscribe({
    //   next: (res)=>{
    //     return true;
    //   }, error: (err)=>{
    //     return false;
    //   }
    // })
    // return true
  // }

  private userDataSubject = new BehaviorSubject<any>(null);
  user$ = this.userDataSubject.asObservable();

  fetchUserData(): any {
    this.http.get(environment.baseURL + 'userdata').subscribe({
      next: (res) => {
        this.userDataSubject.next(res); // update the subject

        return res;
      },
      error: (err) => {
        console.error(err);
        return err;
      },
    });
  }

  updatePassword(passwordData: any) {
    return this.http.post(
      environment.baseURL + 'update-password',
      passwordData
    );
  }

  updateProfile(data: any) {
    console.log(data);

    return this.http.post(environment.baseURL + 'update-profile', data);
  }
}
