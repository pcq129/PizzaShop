import { Component, OnInit } from '@angular/core';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private categoryService: CategoryListService,
    private snackbarService: SnackbarService
  ) {
    this.getCategoryData();
  }

  ngOnInit(): void {}

  categoryData: any[] = [];
  modifierData: any[] = [];
  allItems: any[] = [];

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

  getModifierData(){
    
  }

  extractAllItems(data: any) {
    let allItems = data.flatMap((data: any) => data.items || []);
    this.allItems = allItems;
  }

  refreshCategoryData(check: boolean) {
    if (check == true) {
      this.getCategoryData();
    }
  }
}
