import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {  Router } from '@angular/router';

interface sidebar {
  icon: any;
  title: string;
  redirect: string;
}
@Component({
  selector: 'admin-app',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
    this.loadComponent(this.router.url)
  }
  loadComponent(url: string) {
    // this.currentContent = this.activeRoute.routeConfig?.path || 'dashboard';
    // console.log(this.activeRoute.routeConfig?.path);
    this.currentContent = this.router.url;
    console.log(this.router.url);

    this.router.navigate([url]);
  }
  currentContent : string = 'dashboard';
  sideBarItems: sidebar[] = [
    {
      icon: `dashboard`,
      title: 'Dashboard',
      redirect: 'dashboard',
    },
    {
      icon: `people_outline`,
      title: 'Users',
      redirect: 'users',
    },
    {
      icon: `restaurant_menu`,
      title: 'Menu',
      redirect: 'menu',
    },
    {
      icon: `table_chart`,
      title: 'Table and Sections',
      redirect: 'sections',
    },
    {
      icon: ` money`,
      title: 'Taxes and Fees',
      redirect: 'taxes-fees',
    },
    {
      icon: `assignment_turned_in`,
      title: 'Orders',
      redirect: 'orders',
    },
    {
      icon: `supervised_user_circle`,
      title: 'Customers',
      redirect: 'customers',
    },
  ];

  ngOnInit(): void {}

  logout() {
    this.authService.clear();
  }

  addClass() {}

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

    this.redirect('profile')
  }

  isSelected(currentContent: string){
    if(this.currentContent == '/'+currentContent){
      return true;
    }
    return false;
  }



}
