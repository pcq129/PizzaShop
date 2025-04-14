import { Component, OnInit } from '@angular/core';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ModifierService } from 'src/app/_services/modifier.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

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
        if (res.status == 'true') {
          this.categoryData = res.data;
          this.extractAllItems(res.data);
          console.log(res.data);
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (err) => {
        this.snackbarService.error(err);
      },
    });
  }

  getModifierGroupData() {
    this.modifierService.getModifierGroupsData().subscribe({
      next: (res: any) => {
        if (res.status == 'true') {
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

  extractAllItems(data: any) {
    let allItems = data.flatMap((data: any) => data.items || []);
    this.allItems = allItems;
  }

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
