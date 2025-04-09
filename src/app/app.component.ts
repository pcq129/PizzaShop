import { Component, Input } from '@angular/core';
import { AuthService } from './auth/_services/auth.service';
import { ItemsService } from './_services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private itemsList: ItemsService
  ) {}
  title = 'PizzaShop';
}
