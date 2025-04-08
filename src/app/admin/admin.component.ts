import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

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
  constructor( public authService: AuthService, private router: Router) {}
  loadComponent(arg0: string) {
    this.router.navigate([arg0]);
    console.log(event);
  }
  sideBarItems: sidebar[] = [
    {
      icon: `dashboard`,
      title: 'Dashboard',
      redirect: 'dashboard',
    },
    // {
    //   icon: `people_outline`,
    //   title: 'Users',
    //   redirect: '#',
    // },
    // {
    //   icon: `settings_applications`,
    //   title: 'Roles and Permission',
    //   redirect: '#',
    // },
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
    // {
    //   icon: `supervised_user_circle`,
    //   title: 'Customers',
    //   redirect: '#',
    // },
    {
      icon: ``,
      title: '',
      redirect: '#',
    },
    {
      icon: `restaurant_menu`,
      title: 'Categories',
      redirect: 'category',
    },
    {
      icon: `restaurant_menu`,
      title: 'Items',
      redirect: 'items',
    },
    {
      icon: `restaurant_menu`,
      title: 'Modifiers Group',
      redirect: 'modifiergroup',
    },
    {
      icon: `restaurant_menu`,
      title: 'Modifiers',
      redirect: 'modifiers',
    }


    // {
    //   icon: `person_outline`,
    //   title: 'Customers',
    //   redirect: '',
    // },
    // {
    //   icon: 'supervised_user_circle',
    //   title: 'Roles and Permission',
    //   redirect: '',
    // },
    // {
    //   icon: 'border_all',
    //   title: 'Tables and Sections ',
    //   redirect: '',
    // },
  ];

  ngOnInit(): void {}

  logout() {
    this.authService.clear();
  }

  addClass(){

  }

  brandLogo = '/assets/logos/brandLogo.png';
  profile = '../../assets/pfp.png';

  openOrderApp(){
    this.router.navigate(['order/menu'])
  }


}
