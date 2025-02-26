import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './layout/menu/menu.component';
import { ItemsComponent } from './layout/items/items.component';
const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'items',
    component: ItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
