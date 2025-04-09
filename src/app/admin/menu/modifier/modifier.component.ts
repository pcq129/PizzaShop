import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss'],
})
export class ModifierComponent implements OnInit {
  constructor() {
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
    'modifier_group',
    'rate',
    'unit',
    'quantity',
    'edit',
    'delete',
  ];
  currentModifierGroup: any;
  currentCategory: any;

  extractAllModifiers(data: any) {
    let allModifiers = data.flatMap((data: any) => data.modifiers || []);
    console.log(allModifiers);
    this.viewModifiers = allModifiers;
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
  addModifierGroupPopup() {
    throw new Error('Method not implemented.');
  }

  addModifierPopup() {
    throw new Error('Method not implemented.');
  }
  editModifierPopup(_t108: any) {
    throw new Error('Method not implemented.');
  }
  deleteModifierPopup(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
