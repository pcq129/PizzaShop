import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ItemsService } from 'src/app/_services/items.service';
import { ModifierService } from 'src/app/_services/modifier.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { categoryDialogComponent } from './category-dialog/category-dialog.component';
export interface DialogData {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss'],
})
export class ItemCategoryComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private itemService: ItemsService,
    private categoryService: CategoryListService,
    private modifierService: ModifierService
  ) {
    this.getModifierGroupList();
  }

  ngOnInit(): void {
    // this.extractAllItems(this.categoryData);
  }

  @Input()
  categoryData: any = [];

  @Output()
  refreshCategoryData = new EventEmitter<boolean>();

  modifierData: any = [];
  selectedCategory: number = 0;

  @Input()
  allItems: any = [];
  @Input()
  viewItems: any = [];
  currentCategory: number = 0;
  displayedColumns: string[] = [
    'item',
    'description',
    'category',
    'quantity',
    'unit',
    'rate',
    'tax',
    'edit',
    'delete',
  ];

  getModifierGroupList() {
    this.modifierService.getModifierGroupList().subscribe((res: any) => {
      this.modifierData = res;
      console.log(res);
    });
  }

  extractAllItems(data: any) {
    let allItems = data.flatMap((data: any) => data.items || []);
    console.log(allItems);
    this.viewItems = allItems;
  }

  loadItems(categoryId: number) {
    this.currentCategory = categoryId;
    if (categoryId == 0) {
      this.viewItems = this.allItems;
    } else {
      let categoryItems = this.categoryData.find(
        (category: any) => category.id === categoryId
      ).items;
      this.viewItems = categoryItems;
    }
  }

  //actions for category

  deleteCategoryPopup(id: any): void {
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
    this.categoryService.removeCategory(id).subscribe((res) => {
      this.snackbarService.success('Category deleted successfully');
      // this.getCatList();
    });
  }

  //implementatins for addition of category

  //swap data
  data = {
    name: '',
    description: '',
  };

  //popup
  addCategoryPopup(): void {
    const dialogRef = this.dialog.open(categoryDialogComponent, {
      width: '250px',
      data: {
        name: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.data = result;
      if (result && result.name) {
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
    if (data.name.length > 0) {
      this.categoryService.addCategory(data).subscribe((res: any) => {
        if (res.status === 'false') {
          for (const [key, value] of Object.entries(res.message)) {
            this.snackbarService.error(`${value}`);
          }
        } else {
          this.snackbarService.success('Category added successfully');
          this.refreshCategoryData.emit(true);
        }
      });
    } else {
      console.log('empty values');
    }
  }

  //implementatins for edit category

  //popup
  editCategoryPopup(element: DialogData) {
    let id = element.id;
    const dialogRef = this.dialog.open(categoryDialogComponent, {
      width: '250px',
      data: {
        name: element.name,
        description: element.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      result.id = id;
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
    this.categoryService.editCategory(element).subscribe((res: any) => {
      if (res.status === 'false') {
        for (const [key, value] of Object.entries(res.message)) {
          this.snackbarService.error(`${value}`);
        }
      } else {
        this.snackbarService.success('Category updated successfully');
        this.refreshCategoryData.emit(true);
      }
    });
  }

  //actions for items

  addItemPopup(): void {
    //empty element initialized so that the same modal can be used for editing the data...
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '1000px',
      data: {
        modifierGroupList: this.modifierData,
        categories: this.categoryData,
        modifier_group_ids: [],
        default: false,
        enabled: false,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result.name && result.category_id) {
        this.addItem(result);
      }
    });
  }

  addItem(Item: any) {
    console.log(Item);
    this.itemService.addItem(Item).subscribe((res) => {
      if (res.status === 'false') {
        for (const [key, value] of Object.entries(res.message)) {
          this.snackbarService.error(`${value}`);
        }
      } else {
        this.snackbarService.success(`Item added successfully`);
        this.refreshCategoryData.emit(true);
        this.loadItems(this.selectedCategory);
        this.extractAllItems(this.categoryData);
      }
    });
  }

  deleteItemPopup(id: any): void {
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

  removeItem(id: number) {
    this.itemService.removeItem(id).subscribe(
      (res) => {
        this.snackbarService.success('Item deleted successfully');
        this.refreshCategoryData.emit(true);
        this.loadItems(this.selectedCategory);
        this.extractAllItems(this.categoryData);
      },
      (error) => {
        this.snackbarService.success('Error deleting item');
      }
    );
  }

  editItemPopup(element: any) {
    console.log(element);

    let id = element.id;
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '1000px',
      data: {
        name: element.name,
        unit: element.unit,
        rate: element.rate,
        image: element.image,
        quantity: element.quantity,
        available: element.available,
        item_type: element.item_type,
        categories: this.categoryData,
        short_code: element.short_code,
        description: element.description,
        category_id: element.category_id,
        default_tax: element.default_tax,
        modifierGroupList: this.modifierData,
        tax_percentage: element.tax_percentage,
        modifier_group_ids: element.modifier_groups,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (element.image != result.image) {
        this.deleteElementImage(element.image);
      }
      result.id = id;
      if (result.id && result.name && result.category_id) {
        this.editItems(result);
        console.log('post edit items');
      }
    });
  }

  editItems(Item: any) {
    this.itemService.editItem(Item).subscribe(
      (res: any) => {
        if (res.status === 'false') {
          for (const [key, value] of Object.entries(res.message)) {
            this.snackbarService.error(`${value}`);
          }
        } else {
          this.snackbarService.success(`Item updated successfully`);
          this.refreshCategoryData.emit(true);
          this.loadItems(this.selectedCategory);
          this.extractAllItems(this.categoryData);
        }
      },
      (err) => {
        this.snackbarService.error('Error edititng Item');
      }
    );
  }

  deleteElementImage(imageName: any) {
    this.itemService.removeImage(imageName).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // singleItem: Items = {
  //   name: '',
  //   category: '',
  //   description: '',
  // };



  //actions for category

}
