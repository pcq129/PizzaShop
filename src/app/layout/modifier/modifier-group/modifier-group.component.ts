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
  modifierGroupList: any;
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
    });
  }

  displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];

  //editing modifier group

  modifierGroup: ModifierGroup = {
    groupId: 0,
    name: '',
    description: '',
  };

  openDialog(modifierGroup: ModifierGroup): void {
    this.modifierGroup.groupId = modifierGroup.groupId;
    this.modifierGroup.name = modifierGroup.name;
    this.modifierGroup.description = modifierGroup.description;

    const dialogRef = this.dialog.open(ModifierGroupDialogComponent, {
      width: '350px',
      data: {
        name: modifierGroup.name,
        description: modifierGroup.description,
        groupId: modifierGroup.groupId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
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
        name: this.modifierGroup.name,
        description: this.modifierGroup.description,
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
