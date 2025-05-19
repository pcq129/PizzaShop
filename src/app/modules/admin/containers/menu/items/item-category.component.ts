import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CategoryListService } from './_services/category-list.service';
import { ItemsService } from './_services/items.service';
import { ModifierService} from '../modifier/_services/modifier.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { DeleteDialogComponent } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.component';
import { ItemDialogComponent } from './dialog/item-dialog/item-dialog.component';
import { categoryDialogComponent } from './dialog/category-dialog/category-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { environment } from 'src/environments/environment';

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

  @Input()
  itemData: any = [];

  @Output()
  refreshCategoryData = new EventEmitter<boolean>();

  modifierData: any = [];

  nodata: boolean = true;
  searchData: boolean = false;
  searchQuery: string = '';
  searchItem(itemName: string, pageChange?: any) {
    if (itemName.length < 4) {
      console.log(this.viewItems);
      this.nodata = false;
      setTimeout(() => {
        this.viewItems = this.allItems;
      }, 500);
      return;
    } else {
      this.itemService.search(itemName, pageChange).subscribe({
        next: (res: any) => {
          if (!res.status) {
            this.nodata = true;
            this.viewItems = [];
            return;
          } else if (res.status) {
            this.nodata = false;
            this.resultsLength = res.data.total;
            this.viewItems = res.data.data;
            this.searchData = true;
            this.searchQuery = itemName;
            return;
          } else {
            this.nodata = true;
            console.log(res);
          }
        },
        error: (err: any) => {
          this.nodata = true;
          this.viewItems = [];
        },
      });
    }
  }

  allItems: any = [];
  viewItems: any = [];
  // this.viewItems.paginator = this.paginator
  currentCategory: number = 0;
  displayedColumns: string[] = [
    'select',
    'item',
    'itemType',
    'category',
    'quantity',
    'unit',
    'rate',
    'tax',
    'edit',
    'delete',
  ];

  getImage(itemType: string) {
    switch (itemType) {
      case 'veg':
        return '../../../assets/icons/veg-icon.svg'
      case 'non-veg':
        return '../../../assets/icons/non-veg-icon.svg'
      case 'vegan':
        return '../../../assets/icons/vegan-icon.svg'
      default:
        return;
    }
  }

  multipleDelete(itemIds: number[]) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: itemIds },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.itemService.deleteMultipleItems(itemIds).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              this.snackbarService.success(res.message);
              this.loadItems(this.currentCategory);
              this.selection = [];
            } else {
              this.snackbarService.error(res.message);
            }
          },
        });
      }
    });
  }

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

  resultsLength: number = 0;
  pageSize: number = 5;

  @ViewChild('itemPaginator') itemPaginator!: PaginatorComponent;

  resetSearch() {
    this.viewItems = this.allItems;
    this.nodata = false;
    this.searchData = false;
    this.searchQuery = '';
    this.loadItems(this.currentCategory);
  }

  selection: number[] = [];

  isAllSelected() {
    return this.viewItems.length == this.selection.length;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.viewItems.forEach((element: any) => {
        if (!this.selection.includes(element.id)) {
          this.selection.push(element.id);
        }
      });
    }
  }

  selectItem(itemId: number) {
    if (this.selection.includes(itemId)) {
      let index = this.selection.indexOf(itemId);
      this.selection.splice(index, 1);
    } else {
      this.selection.push(itemId);
    }
  }

  loadItems(categoryId: number, params?: any) {
    if (!params) {
      this.itemPaginator.resetToFirstPage();
    }
    this.currentCategory = categoryId;
    // let categoryItems = this.categoryData.find(
    //   (category: any) => category.id === categoryId
    // ).items;
    // this.viewItems = categoryItems;

    // implement api call here directly (not a good practice but for now will do)

    this.itemService.getItemByCategory(categoryId, params).subscribe({
      next: (res: any) => {
        console.log(res);
        if (!res.data) {
          this.viewItems = [];
          this.itemData = [];
          this.nodata = true;
        } else if (res.data.data.length > 0) {
          this.itemData = res.data.data;
          this.viewItems = res.data.data;
          this.resultsLength = res.data.total;
          this.nodata = false;
          this.selection = [];
        }
      },
      error: (error) => {
        this.snackbarService.error(error.message);
      },
    });
  }

  onPageChange(event: any) {
    if (this.searchData) {
      this.searchItem(this.searchQuery, event);
    } else {
      this.loadItems(this.currentCategory, event);
    }
    this.selection = [];
    return;
  }

  // api call post actions for refreshing the data

  getCategoryData() {
    this.categoryService.getCategoryData().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.categoryData = res.data;
          this.extractAllItems(res.data);
          this.loadItems(this.currentCategory);
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (err) => {
        this.snackbarService.error(err);
      },
    });
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
      // this.refreshCategoryData.emit(true);
      this.loadItems(this.currentCategory);
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
        if (!res.status) {
          this.snackbarService.error(res.message);
        } else {
          this.snackbarService.success('Category added successfully');
          // this.refreshCategoryData.emit(true);
          this.loadItems(this.currentCategory);
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
      if (!res.status) {
        this.snackbarService.error(res.message);
      } else {
        this.snackbarService.success('Category updated successfully');
        // this.refreshCategoryData.emit(true);
        this.loadItems(this.currentCategory);
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
      if (!res.status) {
        this.snackbarService.error(res.message);
      } else {
        this.snackbarService.success(`Item added successfully`);
        // this.refreshCategoryData.emit(true);
        this.loadItems(this.currentCategory);
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
        // this.refreshCategoryData.emit(true);
        this.loadItems(this.currentCategory);
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
        modifier_group_ids: element.modifier_group_ids,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.image && element.image != result.image) {
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
    this.itemService.editItem(Item).subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);

        } else {
          this.snackbarService.success(`Item updated successfully`);
          // this.refreshCategoryData.emit(true);
          this.loadItems(this.currentCategory);
          // this.extractAllItems(this.categoryData);
        }
      },
      error: (err) => {
        this.snackbarService.error('Error edititng Item');
      },
    });
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
