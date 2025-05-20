import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.role$.subscribe({
      next: (res: string | null) => {
        if (res) {
          this.role = res;
          console.log(res);
        }
      },
    });
  }

  role: string | null = null;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('route : ', route.routeConfig?.path);
    console.log(this.router.url);
    console.log(this.authService.isLoggedIn);
    if (localStorage.getItem('isLoggedIn') == '1') {
      console.log(route.routeConfig?.path);

      if (
        route.routeConfig?.path == 'login' ||
        route.routeConfig?.path == 'forgot-password' ||
        route.routeConfig?.path == 'change-password' ||
        route.routeConfig?.path == ''
      ) {
        console.log('here');

        if (this.role != 'chef') {
          this.router.navigate(['pizzashop/dashboard']);
        } else {
          this.router.navigate(['orderapp/kot']);
        }
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
  }
}
