import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ItemsService } from 'src/app/_services/items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  constructor(
    private categoryList: CategoryListService,
    private itemsList: ItemsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.categoryList.getCategoryList().subscribe((res) => {
      this.categories = res;
    });
  }
  categories: any;
  items: any;
  ngOnInit(): void {
    this.categoryList.getCategoryList().subscribe((res) => {
      this.categories = res;
    });
    // this.items = this.itemsList.getItemList();

    this.itemsList.getItemList().subscribe((res) => {
      this.items = res;
    });
  }
}
