import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoryListService } from 'src/app/_services/category-list.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from './common-dialog/common-dialog.component';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { ItemsService } from 'src/app/_services/items.service';

export interface DialogData {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];
  constructor(
    public dialog: MatDialog,
    private categoryList: CategoryListService,
    private itemService: ItemsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  categories: any;
  ngOnInit(): void {
    this.getCatList();
    // this.itemsList.getItemList().subscribe((res) => {
    //   this.items = res;
    // });
  }

  getCatList() {
    this.categoryList.getCategoryList().subscribe((res) => {
      this.categories = res;
      // console.log(this.categories);
      // this.ngOnInit();
    });
  }

  //function to delete category entry

  //popup
  id: any;
  deletePopup(id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      // this.id.id = result;
      this.deleteCategory(result.id);
    });
  }

  //api interaction
  deleteCategory(id: number) {
    let category;
    let categoryname = this.categoryList
      .getSingleCategory(id)
      .subscribe((res) => {
        category = res;
        console.log(res);
        // this.itemService.removeItemOnCategoryDelete(res);
        // this.itemService.removeItemOnCategoryDelete(res);
      });
    // console.log(res);

    this.categoryList.removeCategory(id).subscribe((res) => {
      this.getCatList();
    });
  }

  //implementatins for addition of category

  //swap data
  data = {
    name: '',
    description: '',
  };

  //popup
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        name: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      if (result && result.name && result.description) {
        this.addCategory(result);
      }
    });
  }

  //api interaction
  addCategory(category: DialogData) {
    let data = {
      name: category.name,
      description: category.description,
    };
    if (data.name.length > 0 && data.description.length > 0) {
      this.categoryList.addCategory(data).subscribe((res) => {
        console.log(res);

        this.getCatList();
      });
    } else {
      console.log('empty values');
    }
  }

  //implementatins for edit category

  //popup
  editPopup(element: DialogData) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        id: element.id,
        name: element.name,
        description: element.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      console.log(result);
      // const model = {
      //   id: result.id,
      //   name: result.name,
      //   description: result.description
      // }
      this.editCategory(result);
    });
  }

  //api interaction
  editCategory(element: object) {
    this.categoryList.editCategory(element).subscribe((res) => {
      console.log(res);
      this.getCatList();
    });
  }
}
