import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-orderapp',
  templateUrl: './orderapp.component.html',
  styleUrls: ['./orderapp.component.scss'],
})
export class OrderappComponent implements OnInit {
  constructor(private authservice : AuthService) {}

  ngOnInit(): void {}
  logout() {
    this.authservice.clear();
  }
}
