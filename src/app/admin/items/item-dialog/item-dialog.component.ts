import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { ItemsService } from 'src/app/_services/items.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';


@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent implements OnInit {
imageUrl: any= (this.data.image) ? ("http://127.0.0.1:8000/storage/uploads/"+ this.data.image) : ("http://127.0.0.1:8000/storage/uploads/default.png");


  ngOnInit(): void {
    console.log(this.data);

  }

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService : ItemsService,
    private snackbarSerice: SnackbarService
  ) {
    this.formatModifierGroups();
    this.getCurrentImage();
  }

  currentImage : string|null = null;
  uploadedImage : string|null = null;
  modifier_group_ids : any[] = [];

  getCurrentImage(){
    this.currentImage = this.data.image;
  }
  formatModifierGroups(){
    this.data.modifier_group_ids.forEach((modifierGroup: any) => {
      this.modifier_group_ids.push(modifierGroup.id);
    });
  }
  deleteUploadedImage(imageName :any){
    this.itemService.removeImage(imageName).subscribe({
      next: (res)=>{
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  printData(){
    console.log(this.dataForm);

  }

  dataForm = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    description: new FormControl(this.data.description),
    item_type : new FormControl(this.data.item_type ,[Validators.required,]),
    tax_percentage: new FormControl(this.data.tax_percentage, [
      Validators.required,
    ]),
    quantity: new FormControl(this.data.quantity, [
      Validators.required,
    ]),
    unit: new FormControl(this.data.unit, [
      Validators.required,
    ]),
    rate: new FormControl(this.data.rate, [
      Validators.required,
    ]),
    short_code:  new FormControl(this.data.short_code,[
    ]),
    available: new FormControl(this.data.available ? this.data.available : false,[Validators.required]),
    default_tax : new FormControl(this.data.default_tax ? this.data.default_tax : false, [Validators.required]),
    category_id: new FormControl(this.data.category_id, [Validators.required]),
    modifier_groups_id : new FormControl(this.modifier_group_ids, []),
    image : new FormControl (),
  });

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onNoClick(): void {
    this.deleteUploadedImage(this.uploadedImage);
    this.dialogRef.close();
  }


  getNameError() {
      if (this.dataForm.controls.name.hasError('required')) {
        return 'You must enter a name';
      };
      if (this.dataForm.controls.name.hasError('whitespace')) {
        return 'Invalid input';
      };
      return;
  }
  getUnitError() {
    if (this.dataForm.controls.unit.hasError('required')) {
      return 'You must select a unit';
    };
    return;
  }
  getTypeError() {
    console.log('test');

    if (this.dataForm.controls.item_type.hasError('required')) {
      return 'You must select a Type';
    };
    return;
  }
  getDescriptionError() {
    if (this.dataForm.controls.description.hasError('required')) {
      return 'You must enter a description';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getRateError() {
    if (this.dataForm.controls.rate.hasError('required')) {
      return 'You must enter a rate';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getQuantityError() {
    if (this.dataForm.controls.quantity.hasError('required')) {
      return 'You must enter a quantity';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getTaxError() {
    if (this.dataForm.controls.tax_percentage.hasError('required')) {
      return 'You must specify tax';
    };
    if (this.dataForm.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    };
    return;
  }
  getImageError(){
    if (this.dataForm.controls.image.hasError('maxContentSize')) {
      return 'File size should be less than 5 Mb';
    };
    return;

  }
  getCategoryError(){
    return 'You must select a category';
  }


  // getCatList() {
  //   this.categoryList.getCategoryList().subscribe((res) => {
  //     this.categories = res;
  //   });
  // }

  selectedFile: File | null = null;


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (!this.selectedFile) return;
    if(this.currentImage){
      this.deleteUploadedImage(this.currentImage);
    }

    if(this.selectedFile.type != "jpg" && this.selectedFile.type != "png"){
      const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.snackbarSerice.info("Uploading image");


    this.itemService.uploadImage(formData).subscribe(
      (res: any) => {
        this.uploadedImage = res.path;
        this.dataForm.controls.image.setValue(res.path);
        this.snackbarSerice.success(res.message);
      },
      (error) => this.snackbarSerice.error(error)
    );
    }
    else{
      this.snackbarSerice.error("Image must be jpg or png")
    }
  }
}


