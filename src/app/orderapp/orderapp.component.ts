import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-orderapp',
  templateUrl: './orderapp.component.html',
  styleUrls: ['./orderapp.component.scss'],
})
export class OrderappComponent implements OnInit {
  constructor(private authservice : AuthService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.authservice.clear();
  }
  navigate(link: string){
    this.router.navigateByUrl(link);
  }
}
