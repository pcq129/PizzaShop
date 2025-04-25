import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {

  constructor(
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {
    this.getRoles()
   }

  ngOnInit(): void {
  }

  snakeToTitleCase(str: string): string {
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }



  currentRole:number=0;
  rolesData: any;
  getRoles(){
    this.userService.getRoles().subscribe({
      next: (res:any)=>{
        if(res.status == "true"){
          this.rolesData = res.data;
        }
        else{
          this.snackbarService.error(res.message);
        }
      },
      error: (error)=>{
        this.snackbarService.error(error.message);
      }
    })
  }

  fetchPermissions(id: number){
    this.currentRole = id;

  }

}
