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
import { AuthService } from '../_services/auth.service';
import { SnackbarService } from 'src/app/common/_services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private AuthService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
   this.AuthService.role$.subscribe({
    next: (res: string | null)=>{
      if(res){
        this.role = res;
        console.log(res);
      }
    }
   });
  }

  role : string|null = null;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if(this.router.url==''){
      this.router.navigate(['login']);
      console.log('auth login');

    }
    if(!this.role){
      return false;
    }
    else{
      const { roles } = route.data;

    console.log('Route', this.router.url);

    console.log('User role:', this.role);
    console.log('Allowed roles for this route:', roles);

    if (roles && !roles.includes(this.role)) {
      this.snackbarService.error('Not Allowed');
      if (this.role && this.role !== 'chef') {
        this.router.navigate(['pizzashop/dashboard']);
      }
      else if(this.role){
        this.router.navigate(['orderapp/kot']);
      }if(!this.role){
        this.router.navigate(['login']);
      }
      return false;
    }
    if(!this.role){
      this.router.navigate(['login']);
    }

    return true;
    }

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
        if (this.role != 'chef') {
          this.router.navigate(['pizzashop/dashboard']);
        } else {
          this.router.navigate(['orderapp/kot']);
        }
        return false;
      }
    }

    return true;
  }
}
