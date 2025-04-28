import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionComponent } from './role-permission.component';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from 'src/app/_services/user.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    RolePermissionComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [
    UserService, SnackbarService
  ],
  exports: [RolePermissionComponent]
})
export class RolePermissionModule { }
