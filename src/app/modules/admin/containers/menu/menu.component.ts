import { Component, OnInit } from '@angular/core';
import { CategoryListService } from './items/_services/category-list.service';
import { ModifierService } from './modifier/_services/modifier.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private categoryService: CategoryListService,
    private snackbarService: SnackbarService,
    private modifierService: ModifierService
  ) {
    this.getCategoryData();
    this.getModifierGroupData();
  }

  ngOnInit(): void {}

  categoryData: any[] = [];
  modifierGroupData: any;
  allItems: any[] = [];
  allModifiers: any[] = [];

  getCategoryData() {
    this.categoryService.getCategoryData().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.categoryData = res.data;
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (error: Error) => {
        this.snackbarService.error(error.message);
      },
    });
  }

  getModifierGroupData() {
    this.modifierService.getModifierGroupsData().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.modifierGroupData = res.data;
          console.log(this.modifierGroupData);
          this.extractAllModifiers(res.data);
        } else {
          this.snackbarService.error(res.message + 'test');
        }
      },
      error: (err) => {
        this.snackbarService.error('Error fetching Moidifiers data');
      },
    });
  }

  // extractAllItems(data: any) {
  //   let allItems = data.flatMap((data: any) => data.items || []);
  //   this.allItems = allItems;
  // }

  extractAllModifiers(data: any) {
    let allModifiers = data.flatMap((data: any) => data.modifiers || []);
    console.log(allModifiers);
    this.allModifiers = allModifiers;
  }

  refreshCategoryData(check: boolean) {
    if (check == true) {
      this.getCategoryData();
    }
  }
}
