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
import { ModifierService } from 'src/app/_services/modifier.service';

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
    private snackbarService: SnackbarService,
    private modifierService: ModifierService
  ) {
    this.getCategories();
    this.getModifierGroups();

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
  items: any;
  categories : any;
  modifierGroups: any;


  ngOnInit(): void {
    this.getItems();
    this.getCategories();
  }

  //fetch all item records
  getItems() {
    this.itemService.getItemList().subscribe((res: any) => {
      this.items = res.data;
    });
  }

  //fetch category with name and id column
  getCategories() {
    this.categoryService.getCategoryList().subscribe((res: any) => {
    this.categories = res;
    });
  }

  getModifierGroups(){
    this.modifierService.getModifierGroupsData().subscribe({
      next: (res:any)=>{
        this.modifierGroups = res.data;
      },
      error: (error)=>{
        this.snackbarService.multipleErrors(error);
      }
    })
  }


  //process for adding category

  addItemPopup(): void {

    //empty element initialized so that the same modal can be used for editing the data...
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '1000px',
      data: {
        modifierGroupList : this.modifierGroups,
        categories : this.categories,
        modifier_group_ids : [],
        default: false,
        enabled: false
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if(result.name && result.category_id){
        this.addItem(result);
      }
    });
  }

  addItem(Item: any) {
    console.log(Item);
    this.itemService.addItem(Item).subscribe((res) => {
      if(res.status === "false"){
        for(const[key,value] of Object.entries(res.message)){
          this.snackbarService.error(`${value}`);
        }
      }
      else{
        this.snackbarService.success(`Item added successfully`);
      this.getItems();
      }
    });
  }

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

  removeItem(id: number) {

    this.itemService.removeItem(id).subscribe((res) => {
      this.snackbarService.success('Item deleted successfully');
      this.getItems();
    },(error)=>{
      this.snackbarService.success('Error deleting item');

    });
  }

  editPopup(element: any) {
    // "id": 4,
    // "name": "Margherita",
    // "item_type": "veg",
    // "category_id": 1,
    // "quantity": 43,
    // "unit": "pcs",
    // "rate": 456,
    // "default_tax": 1,
    // "tax_perentage": 8,]]]]
    // "tax_percentage": 30,
    // "available": 0,
    // "short_code": 12,
    // "image": null,
    // "category": {
    //     "id": 1,
    //     "name": "Pizza"
    // },
    // "modifier_groups": [
    //     {
    //         "id": 1,
    //         "name": "tses",
    //         "pivot": {
    //             "item_id": 4,
    //             "modifier_group_id": 1
    //         }
    //     },
    //     {
    //         "id": 2,
    //         "name": "Veggies",
    //         "pivot": {
    //             "item_id": 4,
    //             "modifier_group_id": 2
    //         }
    //     }
    // ]
    let id = element.id;
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '1000px',
      data: {
        name: element.name,
        unit: element.unit,
        rate: element.rate,
        quantity: element.quantity,
        categories : this.categories,
        available : element.available,
        item_type : element.item_type,
        short_code : element.short_code,
        category: element.category.name,
        description: element.description,
        category_id: element.category_id,
        default_tax : element.default_tax,
        image : element.image,
        tax_percentage : element.tax_percentage,
        modifierGroupList : this.modifierGroups,
        modifier_group_ids : element.modifier_groups,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if(element.image != result.image){
        this.deleteElementImage(element.image);
      }
      result.id = id;
      if(result.id && result.name && result.category_id){
        this.editItems(result);
        console.log("post edit items");
      }

    });
  }

  editItems(Item: any) {

    this.itemService.editItem(Item).subscribe((res:any) => {
      if(res.status === "false"){
        for(const[key,value] of Object.entries(res.message)){
          this.snackbarService.error(`${value}`);
        }
      }
      else{
        this.snackbarService.success(`Item updated successfully`);
      this.getItems();
      }
    },(err)=>{
      this.snackbarService.error('Error edititng Item')
    });
  }


  deleteElementImage(imageName :any){
    this.itemService.removeImage(imageName).subscribe({
      next: (res)=>{
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  // singleItem: Items = {
  //   name: '',
  //   category: '',
  //   description: '',
  // };

}


