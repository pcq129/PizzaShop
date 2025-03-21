import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {}

  profile = '../../assets/pfp.png';

  logout() {
    this.authservice.clear();
  }
}
