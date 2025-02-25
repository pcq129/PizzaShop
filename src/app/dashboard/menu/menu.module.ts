import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MenuComponent } from './menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryComponent } from './category/category.component';
import { ItemsComponent } from './items/items.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ItemsService } from 'src/app/_services/items.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [MenuComponent, CategoryComponent, ItemsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  exports: [MenuComponent],
  providers: [CategoryListService, ItemsService],
})
export class MenuModule {}
