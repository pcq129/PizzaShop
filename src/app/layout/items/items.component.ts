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
    private snackbarservice: SnackbarService
  ) {
    this.getCategories();

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


  //process for adding category

  addItemPopup(): void {

    //empty element initialized so that the same modal can be used for editing the data...
    let singleItem = {
      category_id: '',
      name: '',
      category: '',
      description: '',
      quantity: '',
      rate: '',
      tax: '',
      unit: ''
    };
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        categories : this.categories,
        category_id: singleItem.category_id,
        name: singleItem.name,
        category: singleItem.category,
        description: singleItem.description,
        quantity : singleItem.quantity,
        rate: singleItem.rate,
        tax : singleItem.tax,
        unit: singleItem.unit
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('testing');

      let formatData = {
        category_id: `${result.category_id}`,
        description: `${result.description}`,
        name: `${result.name}`,
        quantity: `${result.quantity}`,
        rate: `${result.rate}`,
        tax: `${result.tax}`,
        unit: `${result.unit}`,
      };
      if (
        formatData &&
        // formatData.id &&
        formatData.name &&
        formatData.category_id &&
        formatData.description
      ) {
        this.addItem(formatData);
      }
    });
  }

  addItem(Item: any) {

    this.itemService.addItem(Item).subscribe((res) => {
      if(res.success === "false"){
        for(const[key,value] of Object.entries(res.message)){
          this.snackbarservice.error(`${value}`);
        }
      }
      else{
        this.snackbarservice.success(`Item added successfully`);
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
      this.snackbarservice.success('Item deleted successfully');
      this.getItems();
    },(error)=>{
      this.snackbarservice.success('Error deleting item');

    });
  }

  editPopup(element: any) {
    let id = element.id;
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        categories : this.categories,
        category_id: element.category_id,
        name: element.name,
        category: element.category.name,
        description: element.description,
        quantity: element.quantity,
        rate: element.rate,
        tax: element.tax,
        unit: element.unit
      },
    });

    dialogRef.afterClosed().subscribe((result) => {

      let formatData = {
        id: `${id}`,
        category_id: `${result.category_id}`,
        description: `${result.description}`,
        name: `${result.name}`,
        quantity: `${result.quantity}`,
        rate: `${result.rate}`,
        tax: `${result.tax}`,
        unit: `${result.unit}`,
      };
      console.log(formatData);
      if(formatData.id && formatData.description && formatData.category_id && formatData.name && formatData.quantity && formatData.rate && formatData.tax && formatData.unit){
        this.editItems(formatData);
        console.log("post edit items");

      }

    });
  }

  editItems(Item: any) {

    this.itemService.editItem(Item).subscribe((res:any) => {
      if(res.success === "false"){
        for(const[key,value] of Object.entries(res.message)){
          this.snackbarservice.error(`${value}`);
        }
      }
      else{
        this.snackbarservice.success(`Item updated successfully`);
      this.getItems();
      }
    },(err)=>{
      this.snackbarservice.error('Error edititng Item')
    });
  }

  // singleItem: Items = {
  //   name: '',
  //   category: '',
  //   description: '',
  // };

}


