import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

interface sidebar {
  icon: any;
  title: string;
  redirect: string;
}
@Component({
  selector: 'layout-app',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
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
    {
      icon: `restaurant_menu`,
      title: 'Menu',
      redirect: 'menu',
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
      title: 'Modifiers',
      redirect: 'modifiers',
    },
    {
      icon: `restaurant_menu`,
      title: 'Modifiers Group',
      redirect: 'modifiergroup',
    },
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

  brandLogo = '/assets/logos/brandLogo.png';
}
