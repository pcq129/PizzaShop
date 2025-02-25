import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { CategoryInterface } from 'src/app/common/interfaces/category-interface.data';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnChanges {
  @Input()
  categories: CategoryInterface[] = [];
  constructor(
    private categoryService: CategoryListService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: any): void {
    console.log(changes.categories.currentValue);
    if (changes.categories) {
      this.categories = changes.categories.currentValue;
    }
  }

  ngOnInit(): void {}

  name: string = '';
  description: string = '';

  addCategory() {
    let data = {
      name: this.name,
      description: this.description,
    };
    this.categoryService.addCategory(data).subscribe((res) => {
      console.log(res);
    });
  }
}
