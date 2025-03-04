import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  // static login(): boolean {
  //   if (localStorage.getItem('isLoggedIn')) {
  //     return false;
  //   }
  //   return true;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('route : ', route.routeConfig?.path);
    // debugger;
    // console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      if (
        (localStorage.getItem('isLoggedIn') &&
          route.routeConfig?.path == 'login') ||
        route.routeConfig?.path == 'login/forgot-password'
      ) {
        console.log('loginFalse');
        return false;
      }
      console.log('true');
      return true;
    } else {
      console.log(this.authService.isLoggedIn);
      if (!this.authService.isLoggedIn) {
        if (
          route.routeConfig?.path == 'login' ||
          route.routeConfig?.path == 'forgot-password'
        ) {
          console.log('loginTrue');
          return true;
        }
      }
      console.log('false');
      this.router.navigate(['login']);
      return false;
    }
  }
}
