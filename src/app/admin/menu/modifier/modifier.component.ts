import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifierService } from 'src/app/_services/modifier.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { ModifierGroupDialogComponent } from './modifier-group-dialog/modifier-group-dialog.component';
import { modifierDialog } from './modifier-dialog/modifier-dialog.component';
import { DeleteDialogComponent } from 'src/app/common/delete-dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss'],
})
export class ModifierComponent implements OnInit {
  constructor(
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private modifierService: ModifierService
  ) {
    this.extractAllModifiers(this.modifierGroupData);
  }

  ngOnInit(): void {}

  @Input()
  modifierGroupData: any[] = [];
  @Input()
  viewModifiers: any;
  @Input()
  allModifiers: any;

  displayedColumns: string[] = [
    'item',
    'description',
    // 'modifier_group',
    'rate',
    'unit',
    'quantity',
    'edit',
    'delete',
  ];
  currentModifierGroup = 0;
  currentCategory: any;

  extractAllModifiers(data: any) {
    let allModifiers = data.flatMap((data: any) => data.modifiers || []);
    console.log(allModifiers);
    this.viewModifiers = allModifiers;
    this.loadModifiers(this.currentModifierGroup);
  }

  loadModifiers(mdifierGroupId: number) {
    this.currentModifierGroup = mdifierGroupId;
    if (mdifierGroupId == 0) {
      this.viewModifiers = this.allModifiers;
    } else {
      let modifierItems = this.modifierGroupData.find(
        (modifierGroup: any) => modifierGroup.id === mdifierGroupId
      ).modifiers;
      console.log(modifierItems);

      this.viewModifiers = modifierItems;
    }
  }

  //api call for refreshing data post actions
  getModifierGroupData() {
    this.modifierService.getModifierGroupsData().subscribe({
      next: (res: any) => {
        if (res.status == 'true') {
          this.modifierGroupData = res.data;
          console.log(this.modifierGroupData);
          this.extractAllModifiers(res.data);
        } else {
          this.snackbarService.error(res.message + 'test');
        }
      },
      error: (err) => {
        this.snackbarService.error('Error fetching Moidifiers data');
      },
    });
  }

  // actions for modifier groups

  addModifierGroupPopup() {
    const dialogRef = this.dialog.open(ModifierGroupDialogComponent, {
      width: '350px',
      data: {
        modifierList: this.allModifiers,
        name: '',
        description: '',
        modifiers: [],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.name) {
        this.modifierService.addModifierGroup(result).subscribe(
          (res: any) => {
            if (res.status === 'false') {
              for (const [key, value] of Object.entries(res.message)) {
                this.snackbarService.error(`${value}`);
              }
            } else {
              this.snackbarService.success('Modifier Group added successfully');
              this.getModifierGroupData();
            }
          },
          (err) => {
            this.snackbarService.error('Failed to add modifier');
          }
        );
      }
    });
  }

  deleteModifierGroupPopup(modifierGroupId: any): void {
    console.log(modifierGroupId);

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { id: modifierGroupId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.modifierService.deleteModifierGroup(result.id).subscribe(
        (res: any) => {
          if (res.status === 'false') {
            for (const [key, value] of Object.entries(res.message)) {
              this.snackbarService.error(`${value}`);
            }
          } else {
            this.snackbarService.success('Modifier group deleted successfully');
            this.getModifierGroupData();
          }
        },
        (err) => {
          this.snackbarService.error('Failed to delete modifier group');
        }
      );
    });
  }

  editModifierGroupPopup(modifierGroup: any): void {
    console.log(modifierGroup);

    // this.modifierGroup.name = modifierGroup.name;
    // this.modifierGroup.description = modifierGroup.description;
    console.log(modifierGroup);
    let id = modifierGroup.id;

    const dialogRef = this.dialog.open(ModifierGroupDialogComponent, {
      width: '350px',
      data: {
        modifierList: this.allModifiers,
        // modifiers: modifierGroup.modifiers,
        name: modifierGroup.name,
        description: modifierGroup.description,
        // containedModifierList: this.groupedModifierList(
        //   modifierGroup.id,
        //   this.modifierList
        // ),
        modifiers: modifierGroup.modifiers,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      result.id = id;
      this.modifierService.editModifierGroup(result).subscribe((res: any) => {
        if (res.status === 'false') {
          for (const [key, value] of Object.entries(res.message)) {
            this.snackbarService.error(`${value}`);
          }
        } else {
          this.snackbarService.success('Modifier Group updated successfully');
          this.getModifierGroupData();
        }
      });
    });
  }

  //actions for modifiers

  addModifierPopup() {
    let modifier_group_ids = [];
    const dialogRef = this.dialog.open(modifierDialog, {
      width: '350px',
      data: {
        modifierGroupList: this.modifierGroupData,
        name: '',
        modifier_group_id: [],
        quantity: 0,
        unit: 0,
        description: '',
        rate: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.name && result.modifier_group_id && result.unit) {
        delete result.modifierGroupList;

        console.log('adding');
        this.modifierService.addModifier(result).subscribe(
          (res: any) => {
            if (res.status === 'false') {
              for (const [key, value] of Object.entries(res.message)) {
                this.snackbarService.error(`${value}`);
              }
            } else {
              this.snackbarService.success(`Modifier added successfully`);
              this.getModifierGroupData();
            }
          },
          (err) => {
            this.snackbarService.error('Error adding modifier');
          }
        );
      }
    });
  }

  editModifierPopup(modifier: any): void {
    console.log(modifier);
    let modifier_ids = modifier.id;

    const dialogRef = this.dialog.open(modifierDialog, {
      width: '350px',
      data: {
        modifierGroupList: this.modifierGroupData,
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

      this.modifierService.editModifier(result).subscribe(
        (res: any) => {
          if (res.status === 'false') {
            for (const [key, value] of Object.entries(res.message)) {
              this.snackbarService.error(`${value}`);
            }
          } else {
            this.snackbarService.success(`Modifier updated successfully`);
            this.getModifierGroupData();
          }
        },
        (err) => {
          this.snackbarService.error('Error updating modifier ' + err);
        }
      );
    });
  }

  deleteModifierPopup(modifier_group_id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        modifier_group_id: modifier_group_id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.modifierService.deleteModifier(result.modifier_group_id).subscribe(
        (res: any) => {
          if (res.status === 'false') {
            for (const [key, value] of Object.entries(res.message)) {
              this.snackbarService.error(`${value}`);
            }
          } else {
            this.snackbarService.success(`Modifier deleted successfully`);
            this.getModifierGroupData();
          }
        },
        (err) => {
          this.snackbarService.error('Error deleting modifier');
        }
      );
    });
  }
}
