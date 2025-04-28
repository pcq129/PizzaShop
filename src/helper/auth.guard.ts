import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private AuthService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const role = this.AuthService.role;
    const { roles } = route.data;

    console.log('User role:', role);
    console.log('Allowed roles for this route:', roles);

    if (roles && !roles.includes(role)) {
      this.snackbarService.error('Not Allowed');

      if (role !== 'chef') {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['orderapp/kot']);
      }
      return false;
    }

    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = this.AuthService.role;
    console.log(role);

    if (role) {
      const { roles } = childRoute.data;

      console.log(roles);

      if (role && !roles.includes(role)) {
        console.log(role);

        this.snackbarService.error('Not Allowed');
        if (role != 'chef') {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['orderapp/kot']);
        }
        return false;
      }
    }

    return true;
  }
}
