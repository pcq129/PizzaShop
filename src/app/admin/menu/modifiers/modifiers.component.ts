import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifierService } from 'src/app/_services/modifier.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.scss'],
})
export class ModifiersComponent implements OnInit {
  constructor(
    private modifierService: ModifierService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

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

  @Input() modifierGroupData : any;
  viewModifiers : any;
  modifierGroupList: any;
  modifierData : any;



  loadModifiers(id : number){
    if(id == 0){
      this.viewModifiers = this.modifierData;
    }
    let modifierList = this.modifierGroupData.filter((modifierGroup : any)=> modifierGroup.id == id).modifiers;
    this.viewModifiers = modifierList;
  }


  extractModifiers(data : any){
    let modifierList = data.flatmap(data.modifiers);
    this.modifierData = modifierList;
  }


  //actions for modifiers

  addModifierPopup() {
    let modifier_group_ids = [];
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

    dialogRef.afterClosed().subscribe((result : any) => {
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
              // this.getModifierList();
            }
          },
          (err) => {
            this.snackbarService.error('Error adding modifier');
          }
        );
      }
    });
  }

  //editing modifier

  editModifierPopup(modifier: any): void {
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

      this.modifierService.editModifier(result).subscribe(
        (res: any) => {
          if (res.status === 'false') {
            for (const [key, value] of Object.entries(res.message)) {
              this.snackbarService.error(`${value}`);
            }
          } else {
            this.snackbarService.success(`Modifier updated successfully`);
            // this.getModifierList();
          }
        },
        (err) => {
          this.snackbarService.error('Error updating modifier ' + err);
        }
      );
    });
  }

  //deleting modifiers

  deleteModifierPopup(modifier_group_id: any): void {
    const dialogRef = this.dialog.open(ModifierDeleteDialogComponent, {
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
            this.getModifierList();
          }
        },
        (err) => {
          this.snackbarService.error('Error deleting modifier');
        }
      );
    });
  }
}




//dialog components


//for modifiers

@Component({
  selector: 'modifierDialog',
  templateUrl: 'modifier-dialog.html',
  styleUrls: ['modifiers.component.scss']
})
export class modifierDialog {
  clg(a: any) {
    console.log(a);
  }
  constructor(
    public dialogRef: MatDialogRef<modifierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);

    console.log(data.modifier_group_id);
    data.modifier_group_id.forEach((element:any) => {
      this.modifierGroupId.push(element.pivot.modifier_group_id);
    });

    console.log(this.modifierGroupId);


  }

  modifierGroupId : any[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifierForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    rate: new FormControl(this.data.rate, Validators.required),
    modifier_group_id: new FormControl(this.modifierGroupId),
    quantity: new FormControl(this.data.quantity, Validators.required),
    unit: new FormControl(this.data.unit, Validators.required),
    description: new FormControl(this.data.description, [

    ]),
  });
  // name = this.modifierForm.controls.name;
  // rate = this.modifierForm.controls.rate;
  // quantity = this.modifierForm.controls.quantity;
  // unit = this.modifierForm.controls.unit;
  // description = this.modifierForm.controls.description;
  // groupId = this.modifierForm.controls.groupId;

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}

