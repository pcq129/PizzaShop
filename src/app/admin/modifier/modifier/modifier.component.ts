import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifierGroup, Modifier } from 'src/app/common/interfaces/modifier';
import { modifierDialog } from './modifierDialog/modifierDialog.component';
import { ModifierService } from 'src/app/_services/modifier.service';
import { ModifierDeleteDialogComponent } from './modifier-delete-dialog/modifier-delete-dialog.component';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss'],
})
export class ModifierComponent implements OnInit {
  ngOnInit(): void {
    // this.modifiedModifierList = {
    //   ...this.modifierList,
    //   modifier_groups: {
    //       name: `[${this.modifierList.modifier_groups.map((modifierGroup:any) => modifierGroup.name).join(', ')}]`,
    //       modifier_group_id: `[${this.modifierList.modifier_groups.map((modifierGroup:any) => modifierGroup.pivot.modifier_group_id).join(', ')}]`
    //   }
  // };
  // console.log(this.modifiedModifierList);

  }
  constructor(
    public dialog: MatDialog,
    private modifierService: ModifierService, private snackbarservice : SnackbarService
  ) {
    this.getModifierGroupList();
    this.getModifierList();
    // this.getMapping();
  }


  // exemplery data
  //        {
    // "id": 1,
    // "name": "Tomatoes",
    // "rate": 40,
    // "unit": "grams",
    // "quantity": 8,
    // "description": "Add tomatoes to you order",
    // "modifier_groups":
    //     {
    //         "name": "Veggies",
    //         "pivot": {
    //             "modifier_id": 1,
    //             "modifier_group_id": 2  modifier_groups.pivot.modifier_group_id
    //         }
    //     },
    //         {
    //           "name": "Veggies",
    //           "pivot": {
    //               "modifier_id": 1,
    //               "modifier_group_id": 2  modifier_groups.pivot.modifier_group_id
    //           }
    //       }
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

  modifiedModifierList : any;

  //formating data

  modifierGroupList: any;
  // mapper:any;
  modifier: Modifier = {
    modifierId: 0,
    groupId: 0,
    name: '',
    rate: 0,
    quantity: 0,
    unit: '',
    description: '',
  };


  // getMapping(){
  //   this.modifierService.getMapper().subscribe((res) => {
  //     console.log(res);
  //     this.mapper = res;
  //   });
  // }

  getModifierGroupList() {
    this.modifierService.getModifierGroupList().subscribe((res) => {
      this.modifierGroupList= res;
    });
  }

  getModifierList() {
    this.modifierService.getModifierData().subscribe((res:any) => {
      console.log(res);
      this.modifierList = res.data;
    });
  }


   //adding modifiers

   openAddDialog() {
    let modifier_group_ids = []
    const dialogRef = this.dialog.open(modifierDialog, {
      width: '350px',
      data: {
        modifierGroupList: this.modifierGroupList,
        name: '',
        modifier_group_id: [],
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
        result.modifier_group_id &&
        result.unit
      ) {
        delete result.modifierGroupList;

        console.log('adding');
        this.modifierService.addModifier(result).subscribe((res:any) => {
          if(res.status === "false"){
            for(const[key,value] of Object.entries(res.message)){
              this.snackbarservice.error(`${value}`);
            }
          }
          else{
            this.snackbarservice.success(`Modifier added successfully`);
          this.getModifierList();
          }
        },(err)=>{
          this.snackbarservice.error('Error adding modifier')
        });
      }
    });
  }

  //editing modifier

  openEditDialog(modifier: any): void {
    console.log(modifier);
    let modifier_ids = modifier.id;

    const dialogRef = this.dialog.open(modifierDialog, {
      width: '350px',
      data: {
        modifierGroupList: this.modifierGroupList,
        name: modifier.name,
        modifier_group_id: modifier.modifier_groups,
        quantity: modifier.quantity,
        unit: modifier.unit,
        description: modifier.description,
        rate: modifier.rate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      delete result.modifierGroupList;
      result.id = modifier_ids;

      this.modifierService.editModifier(result).subscribe((res:any) => {
        if(res.status === "false"){
          for(const[key,value] of Object.entries(res.message)){
            this.snackbarservice.error(`${value}`);
          }
        }
        else{
          this.snackbarservice.success(`Modifier updated successfully`);
        this.getModifierList();
        }
      },(err)=>{
        this.snackbarservice.error('Error updating modifier ' + err)
      });
    });
  }

  //deleting modifiers

  openDeleteDialog(modifier_group_id: any): void {
    const dialogRef = this.dialog.open(ModifierDeleteDialogComponent, {
      width: '350px',
      data: {
        modifier_group_id: modifier_group_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.modifierService.deleteModifier(result.modifier_group_id).subscribe((res:any) => {
        if(res.status === "false"){
          for(const[key,value] of Object.entries(res.message)){
            this.snackbarservice.error(`${value}`);
          }
        }
        else{
          this.snackbarservice.success(`Modifier deleted successfully`);
        this.getModifierList();
        }
      },(err)=>{
        this.snackbarservice.error('Error deleting modifier')
      });
    });
  }


}


// 'description': 'for testin purposes',
// 'groupId': 6,
// 'name': 'test modifier',
// 'quantity': 5,
// 'rate': 33,
// 'unit': 'pcs'
