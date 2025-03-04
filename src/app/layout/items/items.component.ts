import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/_services/items.service';
import { Items } from 'src/app/common/interfaces/items-interface.data';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';
import { single } from 'rxjs';
import { CategoryInterface } from 'src/app/common/interfaces/category-interface.data';
import { CategoryListService } from 'src/app/_services/category-list.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  fetchCategoryName(arg0: any) {
    const item = this.categoryList.find((category: any) => category.id == arg0);
    return item.name;
  }

  categoryList: any;

  deletePopup(id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // this.id.id = result;
      this.removeItem(result);
    });
  }
  editPopup(element: any) {
    console.log(element);
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        id: element.id,
        categoryId: element.categoryId,
        name: element.name,
        // category: element.category,
        description: element.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.editItems(result);
    });
  }
  constructor(
    private itemService: ItemsService,
    private dialog: MatDialog,
    private categoryService: CategoryListService
  ) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.getItems();
    // this.getCategories();
  }
  items: any;
  getItems() {
    this.itemService.getItemList().subscribe((res) => {
      this.items = res;
    });
  }
  getCategories() {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryList = res;
    });
  }
  displayedColumns: string[] = [
    'item',
    'description',
    'category',
    'edit',
    'delete',
  ];

  // singleItem: Items = {
  //   name: '',
  //   category: '',
  //   description: '',
  // };
  openDialog(): void {
    let singleItem = {
      categoryId: '',
      id: '',
      name: '',
      // category: '',
      description: '',
    };
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        categoryId: singleItem.categoryId,
        id: singleItem.id,
        name: singleItem.name,
        // category: singleItem.category,
        description: singleItem.description,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (
        result &&
        // result.id &&
        result.name &&
        result.categoryId &&
        result.description
      ) {
        console.log('adding data' + result);
        this.addItem(result);
      }
    });
  }

  addItem(Item: Items) {
    this.itemService.addItem(Item).subscribe((res) => {
      console.log(res);
      this.getItems();
    });
  }

  removeItem(Item: Items) {
    this.itemService.removeItem(Item).subscribe((res) => {
      console.log(res);
      this.getItems();
    });
  }

  editItems(Item: Items) {
    console.log(Item);
    console.log('into the editing');
    this.itemService.editItem(Item).subscribe((res) => {
      console.log(res);
      this.getItems();
    });
  }
}
