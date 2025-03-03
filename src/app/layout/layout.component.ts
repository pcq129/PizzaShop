import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ROUTES } from '@angular/router';

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
  loadComponent(arg0: string) {}
  sideBarItems: sidebar[] = [
    {
      icon: `dashboard`,
      title: 'Dashboard',
      redirect: 'dashboard',
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
  constructor(private LS: AuthService, public authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.LS.clear();
  }

  brandLogo = '../../assets/logos/brandLogo.png';
}
