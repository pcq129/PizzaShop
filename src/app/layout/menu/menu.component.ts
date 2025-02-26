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
import { DialogData } from 'src/app/common/interfaces/DialogData';
import { DialogComponent } from './common-dialog/common-dialog.component';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];
  constructor(
    public dialog: MatDialog,
    private categoryList: CategoryListService
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
      console.log(this.categories);
      // this.ngOnInit();
    });
  }

  addCategory() {
    let data = {
      name: this.data.categoryName,
      description: this.data.categoryDescription,
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

  editCategory(element: object) {
    this.categoryList.editCategory(element).subscribe((res) => {
      console.log(res);

      this.getCatList();
    });
  }

  deleteCategory(id: number) {
    this.categoryList.removeCategory(id).subscribe((res) => {
      console.log(res);

      this.getCatList();
    });
  }

  id: any;
  deletePopup(id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // this.id.id = result;
      this.deleteCategory(result.id);
    });
  }

  data: DialogData = {
    categoryName: '',
    categoryDescription: '',
  };

  editPopup(element: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        id: element.id,
        categoryName: element.categoryName,
        categoryDescription: element.categoryDescription,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      console.log(result);
      const model = {
        id: result.id,
        name: result.categoryName,
        description: result.categoryDescription
      }
      this.editCategory(model);
    });
  }

  categoryName: string = '';
  categoryDescription: string = '';
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        categoryName: this.categoryName,
        categoryDescription: this.categoryDescription,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      this.addCategory();
    });
  }
}
