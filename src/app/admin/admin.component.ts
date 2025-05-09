import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {  Router } from '@angular/router';

interface sidebar {
  icon: any;
  title: string;
  redirect: string;
  role: string[];
}
@Component({
  selector: 'admin-app',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
    this.loadComponent(this.router.url);
    this.currentContent = this.router.url;
    this.authService.role$.subscribe({
      next: (res: string | null)=>{
        if(res){
          this.role = res;
          console.log(res);
        }
      }
     });

  }
  role: string = '';
  loadComponent(url: string) {
    // this.currentContent = this.activeRoute.routeConfig?.path || 'dashboard';
    // console.log(this.activeRoute.routeConfig?.path);
    this.currentContent = url;
    this.router.navigate([url]);
  }
  currentContent : string = 'dashboard';
  sideBarItems: sidebar[] = [
    {
      icon: `dashboard`,
      title: 'Dashboard',
      redirect: 'pizzashop/dashboard',
      role: ['super_admin','account_manager']
    },
    {
      icon: `people_outline`,
      title: 'Users',
      redirect: 'pizzashop/users',
      role: ['super_admin']
    },
    {
      icon: `settings`,
      title: 'Roles and Permissions',
      redirect: 'pizzashop/role-permissions',
      role: ['super_admin']

    },
    {
      icon: `restaurant_menu`,
      title: 'Menu',
      redirect: 'pizzashop/menu',
      role: ['super_admin','account_manager']

    },
    {
      icon: `table_chart`,
      title: 'Table and Sections',
      redirect: 'pizzashop/sections',
      role: ['super_admin','account_manager']

    },
    {
      icon: ` money`,
      title: 'Taxes and Fees',
      redirect: 'pizzashop/taxes-fees',
      role: ['super_admin','account_manager']
    },
    {
      icon: `assignment_turned_in`,
      title: 'Orders',
      redirect: 'pizzashop/orders',
      role: ['super_admin','account_manager']

    },
    {
      icon: `supervised_user_circle`,
      title: 'Customers',
      redirect: 'pizzashop/customers',
      role: ['super_admin','account_manager']

    },
  ];

  ngOnInit(): void {}

  logout() {
    this.authService.clear();
  }



  brandLogo = '/assets/logos/brandLogo.png';
  profile = '../../assets/pfp.png';

  openOrderApp() {
    this.router.navigate(['orderapp/tables']);
  }

  redirect(url: string) {
    this.router.navigateByUrl(url);
  }

  loadUserData(){
    // this.authService.fetchUserData();
    console.log(this.authService.user$);
    this.currentContent = 'pizzashop/profile';

    this.redirect('pizzashop/profile')
  }

  isSelected(currentContent: string){
    if(this.currentContent.endsWith(currentContent)){
      return true;
    }
    return false;
  }



}
