import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/auth/login/login.module';
import { AdminModule } from './modules/admin/admin.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './modules/auth/_services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { Dialog } from '@angular/cdk/dialog';
// import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared-module.module';
import { MatSelectModule } from '@angular/material/select';
import { HeadersInterceptor } from './shared/interceptors/headers.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderappModule } from './modules/app/orderapp.module';
import { PageNotFoundModule } from './shared/components/page-not-found/page-not-found.module';
import { RouterModule } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FirstLoginInterceptor } from './modules/auth/interceptors/first-login.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    LoginModule,
    NgbModule,
    AdminModule,
    HttpClientModule,
    MatButtonModule,
    SharedModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    OrderappModule,
    PageNotFoundModule,
    MatNativeDateModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirstLoginInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
