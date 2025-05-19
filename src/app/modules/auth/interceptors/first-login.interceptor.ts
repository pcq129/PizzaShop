import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { Router } from '@angular/router';

@Injectable()
export class FirstLoginInterceptor implements HttpInterceptor {
  constructor(
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('firstlogin');
        if (event.type === HttpEventType.Response) {
          if(typeof(event.body.data?.is_first_login)==undefined && event.body.data?.is_first_login==null){
            return;
          }
          else if (event.body.data?.is_first_login===true) {
            let response = event.body;
            this.snackbarService.info(response.message);
            if(this.router.url!=='pizzashop/profile-password'){
              console.log('routeing');

              this.router.navigate(['pizzashop/profile-password'])
            }
          }
        }

        console.log('Incoming HTTP response', event);
      })
    );
  }
}
