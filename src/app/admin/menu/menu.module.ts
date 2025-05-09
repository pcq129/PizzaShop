import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from './menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ItemCategoryModule } from './items/item-category.module';
import { ModifierModule } from './modifier/modifier.module';
import { SharedModule } from 'src/app/common/common-module.module';
@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ItemCategoryModule,
    ModifierModule,
    SharedModule
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
