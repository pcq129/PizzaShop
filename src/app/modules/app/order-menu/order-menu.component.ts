import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryListService } from '../../admin/containers/menu/items/_services/category-list.service';
import { ItemsService } from '../../admin/containers/menu/items/_services/items.service';
import { ModifierService } from '../../admin/containers/menu/modifier/_services/modifier.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { modifierDialog } from './modifier-dialog.component';
import { OrderService } from '../../admin/containers/orders/_services/order.service';
import { TaxFeesService } from '../../admin/containers/tax-fees/_services/tax-fees.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';

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
    private taxService: TaxFeesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.getCategoryData();
    this.orderService.currentData.subscribe((res: any) => {
      if (!res) {
        // this.snackbarService.info('Please assign tables first');
        // this.router.navigate(['orderapp/tables']);
      } else {
        this.orderData = res;
        this.placingOrder = true;
        console.log(res);
      }
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
  allItems: any;
  viewItemData: any;
  modifierData: any[] = [];
  singleItemData: any;
  selectedModifiers: number[] = [];
  orderData: any;
  taxData: any = {};
  placingOrder: boolean = false;

  //new order data (temp store)
  items: any[] = [];
  billAmount: number = 0;
  taxBreakup: any = {};
  amount: number = 0;

  favouriteItems: any = [];
  getFavouriteItems() {
    this.itemService.getFavouriteItems().subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);
        } else {
          this.favouriteItems = res.data;
          this.viewItemData = res.data;
        }
      },
    });
  }

  resetSearch() {
    this.currentCategory = 0;
    this.loadItems(0);
  }
  searchOrderItem(item: string, event: Event) {
    if (!item) {
      return;
    }
    event.stopPropagation();
    this.itemService.searchItem(item, this.currentCategory).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.viewItemData = res.data;
        } else {
          this.snackbarService.error(res.message);
          this.viewItemData = [];
        }
      },
      error: (error) => {
        this.snackbarService.error(error.message);
      },
    });
  }

  getCategoryData() {
    this.categoryService.getCategoryData().subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);
        } else {
          this.categoryData = res.data;
          let data = res.data.flatMap((category: any) => category.items);
          // this.viewItemData = data;
          this.allItems = data;
          this.loadItems(this.currentCategory);
          // this.allItemData = data;
        }
      },
    });
  }

  getTaxData() {
    this.taxService.getAllTaxFeesData().subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);
        } else {
          this.taxData = res.data;
          this.cdr.detectChanges();
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
    if (!this.placingOrder) {
      return;
    }
    this.itemService.getSingleItem(item_id).subscribe({
      next: (res: any) => {
        if (res.status == false) {
          this.snackbarService.error(res.message);
        } else {
          this.singleItemData = res.data;

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
              item_rate:
                res.data.rate + (res.data.rate * res.data.tax_percentage) / 100,
              modifiers: [],
              multiplier: 1,
            });
            this.calculateSubTotal(this.items);
            // console.log(this.items);
          }
        }
      },
    });
  }

  itemMultiplier() {}

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
    } else if (id == -1) {
      // this.viewItemData=this.favouriteItems;
      this.getFavouriteItems();
    } else {
      let items = this.categoryData.find(
        (category) => category.id === id,
      ).items;
      this.viewItemData = items;
    }
  }

  getItems(category: any) {
    return category.items;
  }

  addFavourite(item_id: number, event: Event) {
    event.stopPropagation();
    this.itemService.addFavourite(item_id).subscribe({
      next: (res: any) => {
        if (res.status == true) {
          this.snackbarService.success(res.message);
          this.getCategoryData();
        } else {
          this.snackbarService.error(res.message);
        }
      },
      error: (error) => {
        this.snackbarService.error(error.message);
        throw new Error(error);
      },
    });
  }

  calculateSubTotal(orderData: any) {
    let total = 0;

    for (const item of orderData) {
      // Add item rate
      let multiplier = item.multiplier;
      total += item.item_rate * multiplier;

      // Add modifier rates (if any)
      for (const modifier of item.modifiers) {
        total += modifier.modifier_rate * multiplier;
      }
    }

    this.billAmount = Math.round(total);
    return;
  }

  calculateTax(tax: any, totalAmount: number) {
    let taxAmount: number = 0;
    //   {
    //     "id": 1,
    //     "name": "GST",
    //     "type": "percentage",
    //     "amount": 18,
    //     "enabled": 1,
    //     "default": 1
    //   },
    if (tax.type === 'percentage' && tax.enabled && tax.default) {
      taxAmount = (totalAmount * tax.amount) / 100;
    } else if (tax.type === 'flat_amount' && tax.enabled && tax.default) {
      taxAmount = tax.amount;
    }
    this.taxBreakup[tax.name] = taxAmount;
    return Math.round(taxAmount);
  }

  calculateTotal() {
    // this method calculate the final total amount including all the tax and sub total amount

    let totalTax = 0;
    for (const [key, value] of Object.entries(this.taxBreakup)) {
      totalTax += Number(value);
    }
    let totalAmount = totalTax + this.billAmount;
    this.amount = totalAmount;
    return Math.round(totalAmount);
  }

  getItemAmount(item: any) {
    return Math.round(item.rate + (item.rate * item.tax_percentage) / 100);
  }

  generateOrder() {
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
    //   "customer_id": 2
    //
    //   "item_id": 6,
    //   "item_name": "Cheeze Tweeze",
    //   "item_rate": 352.82,
    //   "modifiers": [
    //     {
    //       "modifier_id": 5,
    //       "modifier_name": "Alfredo",
    //       "modifier_rate": 200
    //     }
    //   ]
    //   "GST": 208.08,
    //   "SGST": 208.08,
    //   "CGST": 0,
    //   "Service charges": 230
    // }
    // 1156 order-menu.component.ts:254:12
    // 1813 total

    let order = {
      customer_id: this.orderData.customer_id,
      order_data: JSON.stringify({
        table_ids: this.orderData.table_ids,
        table_names: this.orderData.table_names,
        section_id: this.orderData.section_id,
        section_name: this.orderData.section,
        items: this.items,
        number_of_persons: this.orderData.people,
        taxes: this.taxBreakup,
        subTotal: this.billAmount,
        total: this.amount,
      }),
      amount: this.amount,
    };
    console.log(order.order_data);
    this.orderService.placeOrder(order).subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);
        } else {
          this.snackbarService.success('Order placed successfully');
          this.orderData.id = res.data;
          console.log(this.orderData.id);

          // this.router.navigateByUrl('order/tables');
        }
      },
      error: (err) => {
        this.snackbarService.error('Error occured');
      },
    });
  }

  cancelOrder() {
    // {
    //   "email": "spaneliya@gmail.com",
    //   "name": "feewrer",
    //   "mobile": "9834937844",
    //   "people": 3,
    //   "section": "First Floor",
    //   "section_id": 2,
    //   "table_ids": [
    //     17
    //   ],
    //   "table_names": [
    //     "t5"
    //   ],
    //   "customer_id": 10
    // }
    let orderData = this.orderData;
    console.log(this.orderData);

    orderData.dialogTitle = 'Confirm order cancellation';
    orderData.dialogMessage = 'Are you sure to cancel this order ?';
    (orderData.cancelButton = 'No'), (orderData.confirmButton = 'Yes');

    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: this.orderData,
    });

    confirmationDialog.afterClosed().subscribe((res) => {
      if (res.id) {
        this.orderService.cancelOrder(res).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarService.error(res.message);
            } else {
              this.snackbarService.success(res.message);
              setTimeout(() => {
                this.orderService.clearAssigned();
              }, 1000);
            }
          },
          error: (error) => {
            this.snackbarService.error(error.message);
          },
        });
      } else {
        this.orderService.clearOrderData();
        this.router.navigate(['orderapp/tables']);
      }
    });
  }

  completeOrder(id: number) {
    const confirmation = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Complete Order',
        dialogMessage: 'Are you sure to complete the order?',
        id: id,
        confirmButton: 'Complete Order',
        cancelButton: 'Cancel',
      },
    });

    confirmation.afterClosed().subscribe({
      next: (res: any) => {
        if (res.id) {
          this.orderService.completeOrder(id).subscribe({
            next: (res: any) => {
              if (!res.status) {
                this.snackbarService.error(res.message);
              } else {
                this.snackbarService.success('Order marked as completed');
                this.openRatingDialog();
                this.router.navigate(['orderapp/tables']);
              }
            },
            error: (err) => {
              this.snackbarService.error(err);
            },
          });
        }
      },
    });
  }

  openRatingDialog() {
    const ratingDialog = this.dialog.open(RatingDialogComponent, {
      width: '500px',
      data: {
        orderId: this.orderData.id,
      },
    });

    ratingDialog.afterClosed().subscribe({
      next: (res: any) => {
        let ratingData = {
          rating: JSON.stringify({
            food: res.food,
            ambience: res.ambience,
            service: res.service,
          }),
          comment: res.comment,
          orderId: res.orderId,
        };
        this.orderService.customerFeedback(ratingData).subscribe({
          next: (res: any) => {
            if (res.status) {
              this.snackbarService.success(res.message);
            } else {
              this.snackbarService.error(res.message);
            }
          },
        });
        //   {
        //     "food": 3,
        //     "ambience": 3,
        //     "service": 3,
        //     "comment": "",
        //     "orderId": 64
        // }
      },
      error: (err) => {
        throw err;
      },
    });
  }
}
