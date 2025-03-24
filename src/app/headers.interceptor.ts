import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private router:Router, private authservice: AuthService) {}


  handleAuthError(err: HttpErrorResponse): Observable<any>{
    if (err.status === 401 || err.status === 403) {
      this.authservice.clear();
      this.router.navigateByUrl(`/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
  }
  return throwError(err);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    let access_token = this.authservice.getToken();
    const modifiedRequest = request.clone({

      setHeaders:{
        Authorization : `Bearer ${access_token}`
      }
    })
    return next.handle(modifiedRequest).pipe(catchError(x=> this.handleAuthError(x)));
  }

}
