import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss'],
})
export class RolePermissionComponent implements OnInit {
  disableSaveBtn: boolean = true;
checkChange() {
  if(this.currentRolePermission.length === this.currentRoleData.allPermission.length && this.currentRolePermission.every((value, index) => value === this.currentRoleData.allPermission[index])){
    return true;
  }
  return false;
}
  constructor(
    private snackbarService: SnackbarService,
    private userService: UserService,
    private router: Router
  ) {
    this.getRoles();
  }

  ngOnInit(): void {}

  snakeToTitleCase(str: string): string {
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  currentRole: number = 0;
  currentRoleData: any = {};
  currentRolePermission: string[] = []
  rolesData: any;
  getRoles() {
    this.userService.getRoles().subscribe({
      next: (res: any) => {
        if (res.status == 'true') {
          this.rolesData = res.data;
          this.rolesData.forEach((role: any) => {
            role.allPermission = [];
            role.permissions.forEach((permission: any) => {
              role.allPermission.push(permission.name);
            });
          });
          console.log(this.rolesData);
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (error) => {
        this.snackbarService.error(error.message);
      },
    });
  }

  fetchPermissions(role: any) {
    this.currentRole = role.id;
    this.currentRoleData = role;
    this.currentRolePermission = [...this.currentRoleData.allPermission];
  }

  displayedColumns = ['permission', 'can_view', 'can_add_edit', 'can_delete'];
  permissionData = [
    {
      module: 'User',
      can_view: 'view_user',
      can_add_edit: 'add_edit_user',
      can_delete: 'delete_user',
    },
    {
      module: 'Roles/Permission',
      can_view: 'view_role_permission',
      can_add_edit: 'add_edit_role_permission',
      can_delete: 'delete_role_permission',
    },
    {
      module: 'Menu',
      can_view: 'view_menu',
      can_add_edit: 'add_edit_menu',
      can_delete: 'delete_menu',
    },
    {
      module: 'Table/Section',
      can_view: 'view_table',
      can_add_edit: 'add_edit_table',
      can_delete: 'delete_table',
    },
    {
      module: 'Tax/Fees',
      can_view: 'view_tax',
      can_add_edit: 'add_edit_tax',
      can_delete: 'delete_tax',
    },
    {
      module: 'Orders',
      can_view: 'view_order',
      can_add_edit: 'add_edit_order',
      can_delete: 'delete_order',
    },
  ];

  checked(permission: string) {
    if (this.currentRolePermission.includes(permission)) {
      return true;
    } else {
      return false;
    }
  }

  changePermissions(permission : string){
    this.checkChange();
    this.disableSaveBtn = false;
    if(this.currentRolePermission.includes(permission)){
      let index = this.currentRolePermission.indexOf(permission);
      this.currentRolePermission.splice(index, 1);
    }else{
      this.currentRolePermission.push(permission);
    }
  }

  resetPermissions(){
    this.currentRolePermission = [...this.currentRoleData.allPermission];
    // this.router.navigate(['dashboard']);
    this.disableSaveBtn = true;
  }
  updatePermissions(){
    this.userService.updateRoles(this.currentRole, this.currentRolePermission).subscribe({
      next: (res:any)=>{
        console.log(res);
        if(res.status){
          this.snackbarService.success(res.message);
        }else{
          this.snackbarService.error(res.message);
        }
      },
      error: (error:any)=>{
        console.log(error.message);
      }
    });
  }
}
