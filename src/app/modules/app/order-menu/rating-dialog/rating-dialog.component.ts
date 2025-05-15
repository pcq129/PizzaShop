import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { DialogData } from 'src/app/modules/admin/containers/category/category.component';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }


  reviewForm = new FormGroup({
    food: new FormControl(),
    ambience: new FormControl(),
    service: new FormControl(),
    comment: new FormControl(''),
    orderId : new FormControl(this.data.orderId)
  })

  ratings = [1,2,3,4,5];
  rating = 0;
  sections = ['ambience', 'food','service'];

  onNoClick(): void {
    this.data = null;
    this.dialogRef.close();
  }




  setRating(star: number, control: string): void {
    console.log(this.reviewForm.value);
    this.reviewForm.get(control)?.setValue(star);
    this.rating = star;
  }

  isFilled(star: number, section: string): boolean {
    return star <= this.reviewForm.get(section)?.value;
  }

}
