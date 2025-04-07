import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ItemsService } from 'src/app/_services/items.service';
import { ModifierService } from 'src/app/_services/modifier.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { modifierDialog } from './modifier-dialog.component';
import { OrderService } from '../order-service.service';
import { TaxFeesService } from 'src/app/_services/tax-fees.service';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss'],
})
export class OrderMenuComponent implements OnInit {
  constructor(
    private categoryService: CategoryListService,
    private snackbarService: SnackbarService,
    private itemService: ItemsService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private taxService : TaxFeesService,
  ) {
    this.getCategoryData();
    this.orderService.currentData.subscribe((res: any) => {
      this.orderData = res;


      // [
      //   {
      //     "id": 1,
      //     "name": "GST",
      //     "type": "percentage",
      //     "amount": 18,
      //     "enabled": 1,
      //     "default": 1
      //   },
      //   {
      //     "id": 2,
      //     "name": "SGST",
      //     "type": "percentage",
      //     "amount": 18,
      //     "enabled": 1,
      //     "default": 1
      //   },
      //   {
      //     "id": 3,
      //     "name": "CGST",
      //     "type": "percentage",
      //     "amount": 18,
      //     "enabled": 1,
      //     "default": 0
      //   }
      // ]

    });
    this.getTaxData();
  }

  ngOnInit(): void {}

  // {
  //   "email": "test@test.com",
  //   "name": "Harmit",
  //   "mobile": 8788394783,
  //   "people": 23,
  //   "section": "Ground Floor",
  //   "section_id": 1,
  //   "table_ids": [
  //     10
  //   ],
  //   "table_names": [
  //     "T1"
  //   ],
  //   "id": 2
  // }

  // imageUrl: any= (this.data.image) ? ("http://127.0.0.1:8000/storage/uploads/"+ this.data.image) : ("http://127.0.0.1:8000/storage/uploads/default.png");
  currentCategory: number = 0;
  categoryData: any[] = [];
  viewItemData: any;
  modifierData: any[] = [];
  singleItemData: any;
  selectedModifiers: number[] = [];
  orderData: any;
  taxData : any = {

  };

  //new order data (temp store)
  items: any[] = [];
  billAmount: number = 0;
  taxBreakup : any = {
    'total' : 0,
  };

  getCategoryData() {
    this.categoryService.getCategoryData().subscribe({
      next: (res: any) => {
        if (res.status == 'false') {
          this.snackbarService.error(res.message);
        } else {
          this.categoryData = res.data;
          let data = res.data.flatMap((category: any) => category.items);
          this.viewItemData = data;
          console.log(this.viewItemData);
        }
      },
    });
  }

  getTaxData() {
    this.taxService.getAllTaxFeesData().subscribe({
      next: (res: any) => {
        if (res.status == 'false') {
          this.snackbarService.error(res.message);
        } else {
          this.taxData = res.data;
          console.log(this.taxData);
        }
      },
    });
  }

  // getModifierGroupData(){
  //   this.modifierService.getModifierGroupsData().subscribe({
  //     next: (res : any)=>{
  //       if(res.status == false){
  //         this.snackbarService.error(res.message);
  //       }
  //       else{
  //         this.modifierData = res.data;
  //         console.log(this.modifierData);

  //       }
  //     }
  //   })
  // }

  addModifierPopup(item_id: number) {
    this.itemService.getSingleItem(item_id).subscribe({
      next: (res: any) => {
        if (res.status == false) {
          this.snackbarService.error(res.message);
        } else {
          this.singleItemData = res.data;
          console.log(res.data);

          if (res.data.modifier_groups.length != 0) {
            this.openPopup();
          } else {
            this.items.push({
              // [
              //   {
              //     "item_id": 5,
              //     "item_name": "Tandoori Burger",
              //     "modifiers": [
              //       {
              //         "modifier_id": 8,
              //         "modifier_name": "Regular",
              //         "modifier_rate": 60
              //       },
              //       {
              //         "modifier_id": 2,
              //         "modifier_name": "Medium",
              //         "modifier_rate": 200
              //       }
              //     ]
              //   }
              // ]

              item_id: res.data.id,
              item_name: res.data.name,
              item_rate: res.data.rate,
              modifiers: [],
            });
            this.calculateSubTotal(this.items);
            // console.log(this.items);
          }
        }
      },
    });
  }

  openPopup() {
    const addModifierDialog = this.dialog.open(modifierDialog, {
      width: '600px',
      data: this.singleItemData,
    });
    addModifierDialog.afterClosed().subscribe((result) => {
      if (result.item_id) {
        this.items.push(result);
        this.calculateSubTotal(this.items);
      }
    });
  }

  loadItems(id: number) {
    this.currentCategory = id;
    if (id == 0) {
      let data = this.categoryData.flatMap((entry) => entry.items);
      this.viewItemData = data;

      // return entries.flatMap(entry => entry.items);
    } else {
      let items = this.categoryData.find(
        (category) => category.id === id
      ).items;
      this.viewItemData = items;
    }
    console.log(this.viewItemData);
  }

  getItems(category: any) {
    return category.items;
  }

  addFavourite() {
    alert('Item added to favs (just kidding, implementation pending)');
  }

  calculateSubTotal(orderData: any) {
    let total = 0;

    for (const item of orderData) {
      // Add item rate
      total += item.item_rate;

      // Add modifier rates (if any)
      for (const modifier of item.modifiers) {
        total += modifier.modifier_rate;
      }
    }

    this.billAmount = total;
    console.log(this.billAmount);
    return;
  }

  calculateTax(tax : any, totalAmount: number){
    let taxAmount : number = 0;
     //   {
      //     "id": 1,
      //     "name": "GST",
      //     "type": "percentage",
      //     "amount": 18,
      //     "enabled": 1,
      //     "default": 1
      //   },
      if(tax.type === "percentage" && tax.enabled && tax.default){
        taxAmount = totalAmount*(tax.amount)/100;
      }else if(tax.type === "flat_amount" && tax.enabled && tax.default){
        taxAmount = tax.amount;
      }
      let taxname = tax.name
      this.taxBreakup[tax.name] = taxAmount;
      console.log(this.taxBreakup);


  }

  calculateTotal(){
    console.log(this.taxBreakup);

  }


}
