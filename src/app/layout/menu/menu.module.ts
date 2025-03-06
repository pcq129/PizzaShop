import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModule } from '../category/category.module';
import { ItemsModule } from '../items/items.module';
import { ModifierGroupModule } from '../modifier/modifier-group/modifier-group.module';
import { ModifierModule } from '../modifier/modifier/modifier.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from './menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    CategoryModule,
    ItemsModule,
    ModifierGroupModule,
    ModifierModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
})
export class MenuModule {}
