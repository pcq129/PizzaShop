import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

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
    console.log(this.authService.isLoggedIn);
    if (localStorage.getItem('isLoggedIn') == '1') {
      if (
        route.routeConfig?.path == 'login' ||
        route.routeConfig?.path == 'forgot-password' ||
        route.routeConfig?.path == 'change-password'
      ) {
        this.router.navigate(['dashboard']);
        return false;
      }
      return true;
    } else {
      if (
        route.routeConfig?.path == 'login' ||
        route.routeConfig?.path == 'forgot-password' ||
        route.routeConfig?.path == 'change-password'
      ) {
        console.log('loginTrue');
        return true;
      }
      console.log('false');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  //   const isLoggedIn = this.authService.isLoggedIn;
  //   const publicRoutes = ['login', 'forgot-password', 'change-password'];
  //   const currentPath = route.routeConfig?.path ?? '';

  //   if (isLoggedIn) {
  //     // Prevent access to login/forgot/change-password pages if already logged in
  //     if (publicRoutes.includes(currentPath)) {
  //       console.log('User is already logged in. Access denied to auth pages.');
  //       return false;
  //     }
  //     console.log('User is authenticated. Access granted.');
  //     return true;
  //   }

  //   // Not logged in
  //   if (publicRoutes.includes(currentPath)) {
  //     console.log('User is not logged in. Access granted to auth pages.');
  //     return true;
  //   }

  //   console.log('User is not logged in. Redirecting to login page.');
  //   this.router.navigate(['login']);
  //   return false;
  // }
}
