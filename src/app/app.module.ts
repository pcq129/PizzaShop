import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './auth/login/login.module';
import { AdminModule } from './admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './_services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryModule } from './admin/category/category.module';
import { LoggingInterceptor } from '../helper/logging.interceptor';

// import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonDialogModule } from './admin/category/common-dialog/common-dialog.module';
import { SharedModule } from './common/common-module.module';
import { MatSelectModule } from '@angular/material/select';
import { HeadersInterceptor } from '../helper/headers.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderappModule } from './orderapp/orderapp.module';
import { PageNotFoundModule } from './common/page-not-found/page-not-found.module';
import { RouterModule } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
    CategoryModule,
    HttpClientModule,
    CommonDialogModule,
    MatButtonModule,
    SharedModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    OrderappModule,
    PageNotFoundModule,
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
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
