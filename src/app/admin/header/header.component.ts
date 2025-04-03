import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authservice: AuthService,private route : Router) {}

  ngOnInit(): void {}

  profile = '../../assets/pfp.png';

  openOrderApp(){
    this.route.navigate(['order'])
  }

  logout() {
    this.authservice.clear();
  }
}
