import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/_services/items.service';
import { Items } from 'src/app/common/interfaces/items-interface.data';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
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
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        id: element.id,
        name: element.name,
        category: element.category,
        description: element.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.singleItem = result;
      console.log(result);
      this.editItems(result);
    });
  }
  constructor(private itemService: ItemsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getItems();
  }
  items: any;
  getItems() {
    this.itemService.getItemList().subscribe((res) => {
      this.items = res;
    });
  }
  displayedColumns: string[] = [
    'item',
    'description',
    'category',
    'edit',
    'delete',
  ];

  singleItem: Items = {
    name: '',
    category: '',
    description: '',
  };
  openDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        name: this.singleItem.name,
        category: this.singleItem.category,
        description: this.singleItem.description,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.singleItem = result;
      console.log(this.singleItem);
      this.addItem(this.singleItem);
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
