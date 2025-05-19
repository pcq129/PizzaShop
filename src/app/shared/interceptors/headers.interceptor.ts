import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackbarservice: SnackbarService,
    private authservice: AuthService,
    private matDialog: MatDialog
  ) {}

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    let url = this.router.url;
    console.log('into the interceptor headeres');

    if (err.status === 401 || err.status === 403) {
      if (url == '/login') {
        this.snackbarservice.error('Invalid Credentials');
      } else {
        // console.log(err);

        this.snackbarservice.error(err.message);
      }
      this.matDialog.closeAll();
      this.authservice.clear();
      console.log(this.router.url);
      this.router.navigateByUrl(`/login`);

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      // return of(err.message); // or EMPTY may be appropriate here
    }
    if (err.status >= 500) {
      console.log(err.status);

      if(url == '/login'){
        this.snackbarservice.error('Unable to connect to server');
      }
      else{
        this.snackbarservice.error(err.message);
      }
  }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    let access_token = this.authservice.getToken();
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return next
      .handle(modifiedRequest)
      .pipe(catchError((err) => this.handleAuthError(err)));
  }
}
