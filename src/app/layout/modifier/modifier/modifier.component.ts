import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifierGroup, Modifier } from 'src/app/common/interfaces/modifier';
import { modifierDialog } from './modifierDialog/modifierDialog.component';
import { ModifierService } from 'src/app/_services/modifier.service';
import { ModifierDeleteDialogComponent } from './modifier-delete-dialog/modifier-delete-dialog.component';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss'],
})
export class ModifierComponent implements OnInit {
  ngOnInit(): void {
    this.getModifiers();
    this.getModifiersList();
  }
  constructor(
    public dialog: MatDialog,
    private modifierService: ModifierService
  ) {}


  // exemplery data
  //           "modifier_group_id": 5,
  //           "name": "test modifier",
  //           "rate": 33,
  //           "unit": "pieces",
  //           "quantity": 5,
  //           "description": "for testin purposes",
  //           "modifier_group": {
  //               "name": "test modifier Group2"
  //           }
  displayedColumns: string[] = [
    'item',
    'description',
    'modifier_group',
    'rate',
    'unit',
    'quantity',
    'edit',
    'delete',
  ];

  //data fetching
  modifierList: any;
  modifierGroupList: any;
  getModifiersList() {
    this.modifierService.getModifierGroupList().subscribe((res) => {
      console.log(res);
      this.modifierGroupList= res;
    });
  }
  getModifiers() {
    this.modifierService.getModifier().subscribe((res:any) => {
      console.log(res);
      this.modifierList = res.data;
    });
  }

  //editing modifiers

  modifier: Modifier = {
    modifierId: 0,
    groupId: 0,
    name: '',
    rate: 0,
    quantity: 0,
    unit: '',
    description: '',
  };

  openDialog(modifier: any): void {
    console.log(modifier);
    const dialogRef = this.dialog.open(modifierDialog, {
      width: '350px',
      data: {
        modifierGroupList: this.modifierGroupList,
        name: modifier.name,
        groupId: modifier.groupId,
        modifierId: modifier.id,
        quantity: modifier.quantity,
        unit: modifier.unit,
        description: modifier.description,
        rate: modifier.rate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      delete result.modifierGroupList;
      console.log(result);

      this.modifierService.editModifier(result).subscribe(() => {
        this.getModifiers();
      });
    });
  }

  //deleting modifiers

  openDeleteDialog(modifierId: any): void {
    const dialogRef = this.dialog.open(ModifierDeleteDialogComponent, {
      width: '350px',
      data: {
        modifierId: modifierId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.modifierId);
      this.modifierService.deleteModifier(result.modifierId).subscribe(() => {
        this.getModifiers();
      });
    });
  }

  //adding modifiers

  openAddDialog() {
    const dialogRef = this.dialog.open(modifierDialog, {
      width: '350px',
      data: {
        modifierGroupList: this.modifierGroupList,
        name: '',
        groupId: 0,
        quantity: 0,
        unit: 0,
        description: '',
        rate: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (
        result &&
        result.name &&
        result.groupId &&
        result.quantity &&
        result.unit &&
        result.description
      ) {
        delete result.modifierGroupList;

        console.log('adding');
        this.modifierService.addModifier(result).subscribe(() => {
          this.getModifiers();
        });
      }
    });
  }
}
