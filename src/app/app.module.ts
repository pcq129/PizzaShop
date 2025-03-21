import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './auth/login/login.module';
import { LayoutModule } from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './_services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryModule } from './layout/category/category.module';
import { LoggingInterceptor } from './logging.interceptor';

// import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonDialogModule } from './layout/category/common-dialog/common-dialog.module';
import { ItemsModule } from './layout/items/items.module';
import { SharedModule } from './common/common-module.module';
import { MatSelectModule } from '@angular/material/select';
import { HeadersInterceptor } from './headers.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    NgbModule,
    LayoutModule,
    CategoryModule,
    HttpClientModule,
    CommonDialogModule,
    MatButtonModule,
    SharedModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
  }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
