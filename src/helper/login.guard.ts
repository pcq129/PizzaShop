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
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

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
        if(this.authService.role!='chef'){
          this.router.navigate(['dashboard']);
        }
        else{
          this.router.navigate(['orderapp/kot'])
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
