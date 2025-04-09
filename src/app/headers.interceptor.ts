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
import { AuthService } from './auth/_services/auth.service';
import { SnackbarService } from './_services/snackbar.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackbarservice: SnackbarService,
    private authservice: AuthService
  ) {}

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    let url = this.router.url;
    if (err.status === 401 || err.status === 403) {
      if (url == '/login') {
        this.snackbarservice.error('Invalid Credentials');
      } else {
        this.snackbarservice.error(err.error.message);
      }
      this.authservice.clear();
      console.log(this.router.url);
      this.router.navigateByUrl(`/login`);

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
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

  //
  // console.log(request);
  //   let access_token = this.authservice.getToken();
  //   console.log(request);

  //   const url = window.location.href;
  //   const pattern = /^http:\/\/127\.0\.0\.1:8000\/api\/item/;

  //   if (pattern.test(url)) {

  //     const modifiedRequest = request.clone({
  //       headers: request.headers.set('Content-Type', 'application/json')})
  //   } else {
  //     const modifiedRequest = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     });
  //     return next
  //       .handle(modifiedRequest)
  //       .pipe(catchError((err) => this.handleAuthError(err)));
  //   }
  //   }
}
