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
import { LoggingInterceptor } from 'src/app/logging.interceptor';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(
    private itemService: ItemsService,
    private dialog: MatDialog,
    private categoryService: CategoryListService,
    private snackbarservice: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.getItems();
    // this.getCategories();
  }
  items: any;

  getItems() {
    this.itemService.getItemList().subscribe((res:any) => {
      this.items = res.data;
      console.log(this.items);
    });
  }

  //exemplery data from api
// {
//   "id": 3,
//   "name": "testIte3m",
//   "description": "testItem3",
//   "category_id": 50,
//   "quantity": 2,
//   "rate": 45,
//   "tax": 15,
//   "category": {
//       "id": 50,
//       "name": "Pidizza"
//   }
// },

  deletePopup(id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let id = result.id;
      // this.id.id = result;
      this.removeItem(id);
    });
  }
  editPopup(element: any) {
    console.log(element);
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        id: element.id,
        categoryId: element.category_id,
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



  // getCategories() {
  //   this.categoryService.getCategoryList().subscribe((res) => {
  //     this.categoryList = res;
  //   });
  // }
  displayedColumns: string[] = [
    'item',
    'description',
    'category',
    'quantity',
    'rate',
    'tax',
    'edit',
    'delete',
  ];

  // singleItem: Items = {
  //   name: '',
  //   category: '',
  //   description: '',
  // };
  addItemPopup(): void {
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
        // id: singleItem.id,
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

  removeItem(id: number) {
    console.log(id);

    this.itemService.removeItem(id).subscribe((res) => {
      this.snackbarservice.success('Item deleted successfully')
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
