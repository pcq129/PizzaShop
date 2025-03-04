// export interface Modifier {
//   modifierId: number;
//   groupId: number;
//   name: string;
//   rate: number;
//   quantity: number;
//   unit: string;
//   description: string;
// }

// export interface ModifierGroup {
//   groupId: number;
//   name: string;
//   description: string;
// }

import { Component, OnInit } from '@angular/core';
import { ModifierService } from 'src/app/_services/modifier.service';
import { Modifier, ModifierGroup } from 'src/app/common/interfaces/modifier';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModifierGroupDialogComponent } from './modifier-group-dialog/modifier-group-dialog.component';
import { ModifierDeleteDialogComponent } from '../modifier/modifier-delete-dialog/modifier-delete-dialog.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-modifier-group',
  templateUrl: './modifier-group.component.html',
  styleUrls: ['./modifier-group.component.scss'],
})
export class ModifierGroupComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private modifierService: ModifierService
  ) {}

  ngOnInit(): void {
    this.getModifiersList();
    this.getModifiers();
  }

  modifierList: any;
  //   {
  //     "name": "pepperonifadf",
  //     "groupId": 51,
  //     "modifierId": 55,
  //     "quantity": 50,
  //     "unit": "pcs",
  //     "description": "pepperoni",
  //     "rate": 250,
  //     "id": 55
  //   },
  //   {
  //     "name": "cheeze",
  //     "groupId": 51,
  //     "quantity": 32,
  //     "unit": "gms",
  //     "description": "cheze",
  //     "rate": 234,
  //     "id": 56
  //   },
  //   {
  //     "name": "March Modifier test1",
  //     "groupId": 51,
  //     "modifierId": 57,
  //     "quantity": 51,
  //     "unit": "gms",
  //     "description": "dsffdsf1",
  //     "rate": 101,
  //     "id": 57
  //   },
  //   {
  //     "name": "Small",
  //     "groupId": 52,
  //     "quantity": 10,
  //     "unit": "pcs",
  //     "description": "small pieces",
  //     "rate": 150,
  //     "id": 58
  //   },
  //   {
  //     "name": "Medium",
  //     "groupId": 52,
  //     "quantity": 20,
  //     "unit": "pcs",
  //     "description": "medium",
  //     "rate": 200,
  //     "id": 59
  //   },
  //   {
  //     "name": "Large",
  //     "groupId": 52,
  //     "quantity": 30,
  //     "unit": "pcs",
  //     "description": "large p",
  //     "rate": 250,
  //     "id": 60
  //   }
  // ];

  modifierGroupList: any;

  getModifierListForModifierGroup(modifierList: Modifier[], id: number) {}

  getModifiersList() {
    this.modifierService.getModifierGroups().subscribe((res) => {
      console.log(res);
      this.modifierGroupList = res;
    });
  }
  getModifiers() {
    this.modifierService.getModifier().subscribe((res) => {
      console.log(res);
      this.modifierList = res;
      const test = this.groupedModifierList(51, res);
      console.log(test);
    });
  }

  displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];

  //editing modifier group

  modifierGroup: ModifierGroup = {
    id: 0,
    name: '',
    description: '',
    isSelected: [0],
  };

  groupedModifierList(id: number, modifierlist: any) {
    const x = modifierlist.filter((el: any) => {
      return el.groupId == id;
    });
    return x;
  }

  openDialog(modifierGroup: ModifierGroup): void {
    this.modifierGroup.id = modifierGroup.id;
    this.modifierGroup.name = modifierGroup.name;
    this.modifierGroup.description = modifierGroup.description;
    console.log(modifierGroup);

    const dialogRef = this.dialog.open(ModifierGroupDialogComponent, {
      width: '350px',
      data: {
        name: modifierGroup.name,
        description: modifierGroup.description,
        id: modifierGroup.id,
        containedModifierList: this.groupedModifierList(
          modifierGroup.id,
          this.modifierList
        ),
        isSelected: modifierGroup.isSelected,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      delete result.containedModifierList;

      this.modifierService.editModifierGroup(result).subscribe(() => {
        this.getModifiersList();
      });
    });
  }

  //adding data

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModifierGroupDialogComponent, {
      width: '350px',
      data: {
        name: '',
        description: '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.name && result.description) {
        this.modifierService.addModifierGroup(result).subscribe((res) => {
          console.log(res);
          this.getModifiersList();
        });
      }
    });
  }

  openDeleteDialog(modifierGroupId: any): void {
    const dialogRef = this.dialog.open(ModifierDeleteDialogComponent, {
      width: '350px',
      data: {
        modifierId: modifierGroupId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.modifierId);
      this.modifierService
        .deleteModifierGroup(result.modifierId)
        .subscribe(() => {
          this.getModifiersList();
        });
    });
  }
}
