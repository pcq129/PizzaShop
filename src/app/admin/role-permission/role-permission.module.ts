import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionComponent } from './role-permission.component';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from 'src/app/_services/user.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';



@NgModule({
  declarations: [
    RolePermissionComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule
  ],
  providers: [
    UserService, SnackbarService
  ],
  exports: [RolePermissionComponent]
})
export class RolePermissionModule { }
