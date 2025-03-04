import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './auth/login/login.module';
import { LayoutModule } from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from './layout/menu/menu.module';

// import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonDialogModule } from './layout/menu/common-dialog/common-dialog.module';
import { ItemsModule } from './layout/items/items.module';
import { SharedModule } from './common/common-module.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    NgbModule,
    LayoutModule,
    MenuModule,
    HttpClientModule,
    CommonDialogModule,
    MatButtonModule,
    SharedModule,
    MatSelectModule
    // ItemsModule,
    // MatIconModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
