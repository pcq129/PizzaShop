import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { Items } from 'src/app/common/interfaces/items-interface.data';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent implements OnInit {
  ngOnInit(): void {
    this.getCatList();
  }

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Items,
    private categoryList: CategoryListService
  ) {}

  categories: any;

  dataForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    description: new FormControl(this.data.description, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    categoryId: new FormControl(this.data.categoryId, Validators.required),
  });

  name = this.dataForm.controls.name;
  description = this.dataForm.controls.description;
  categoryId = this.dataForm.controls.categoryId;
  onNoClick(): void {
    this.dialogRef.close();
  }

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getCatList() {
    this.categoryList.getCategoryList().subscribe((res) => {
      this.categories = res;
    });
  }
}
