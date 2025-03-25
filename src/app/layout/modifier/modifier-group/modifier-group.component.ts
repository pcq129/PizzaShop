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
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-modifier-group',
  templateUrl: './modifier-group.component.html',
  styleUrls: ['./modifier-group.component.scss'],
})
export class ModifierGroupComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private modifierService: ModifierService,
    private snackbarservice :SnackbarService
  ) {}

//   {
//     "name": "test modifier Group2",
//     "description": "this record is for testing purposes"
// },

  ngOnInit(): void {
    this.getModifiersGroup();
  }

  modifierList: any;
  modifierGroupList: any;


  getModifiersGroup() {
    this.modifierService.getModifierGroupsData().subscribe((res:any) => {
      console.log(res);
      this.modifierGroupList = res.data;
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

  // groupedModifierList(id: number, modifierlist: any) {
  //   const x = modifierlist.filter((el: any) => {
  //     return el.groupId == id;
  //   });
  //   return x;
  // }

  //editing modifier group
  editPopup(modifierGroup: ModifierGroup): void {
    this.modifierGroup.name = modifierGroup.name;
    this.modifierGroup.description = modifierGroup.description;
    console.log(modifierGroup);
    let id= modifierGroup.id;

    const dialogRef = this.dialog.open(ModifierGroupDialogComponent, {
      width: '350px',
      data: {
        name: modifierGroup.name,
        description: modifierGroup.description,
        // containedModifierList: this.groupedModifierList(
        //   modifierGroup.id,
        //   this.modifierList
        // ),
        isSelected: modifierGroup.isSelected,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      delete result.containedModifierList;
      result.id = id;
      console.log(result);


      this.modifierService.editModifierGroup(result).subscribe((res:any) => {
        if(res.status === "false"){
          for(const[key,value] of Object.entries(res.message)){
            this.snackbarservice.error(`${value}`);
          }
        }
        else{
          this.snackbarservice.success('Modifier Group updated successfully')
          this.getModifiersGroup();
        }
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
        this.modifierService.addModifierGroup(result).subscribe((res:any) => {
          if(res.status === "false"){
            for(const[key,value] of Object.entries(res.message)){
              this.snackbarservice.error(`${value}`);
            }
          }
          else{
            this.snackbarservice.success('Modifier Group added successfully')
            this.getModifiersGroup();
          }
        }, (err)=>{
          this.snackbarservice.error('Failed to add modifier')
        });
      }
    });
  }

  //delete modifier group

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
        .subscribe((res:any) => {
          if(res.status === "false"){
            for(const[key,value] of Object.entries(res.message)){
              this.snackbarservice.error(`${value}`);
            }
          }
          else{
            this.snackbarservice.success('Modifier group deleted successfully')
            this.getModifiersGroup();
          }
        },(err)=>{
          this.snackbarservice.error('Failed to delete modifier group')
        });
    });
  }
}
