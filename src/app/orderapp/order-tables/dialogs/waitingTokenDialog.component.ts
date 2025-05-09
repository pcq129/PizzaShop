import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TableSectionService } from "src/app/_services/table-section.service";

@Component({
  selector: 'waitingTokenDialog',
  templateUrl: 'waitingTokenDialog.component.html',
  styleUrls : ['../order-tables.component.scss']
})
export class waitingTokenDialog {


  constructor(
    public dialogRef: MatDialogRef<waitingTokenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private tableSectionService: TableSectionService
  ) {
    console.log(this.data);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  mobilePattern = '^[0-9_-]{10,12}';
  // searchedCustomers: any = {};
  // // test : string = '';

  // loadCustomerData(customer : any){
  //   this.customerData.controls.email.setValue(customer.email);
  //   this.customerData.controls.mobile.setValue(customer.mobile);
  //   this.customerData.controls.name.setValue(customer.name);
  //   this.customerData.controls.headCount.setValue(customer.head_count);
  //   this.customerData.controls.sectionId.setValue(customer.section_id);
  //   return;
  // }

  // searchCustomer(email: string) {
  //   if(email.length<4){
  //     this.searchedCustomers = {};
  //     return;
  //   }
  //   this.tableSectionService.searchCustomer(email).subscribe({
  //     next: (res: any) => {
  //       if(res.status){
  //         this.searchedCustomers = (res.data);
  //         console.log(this.searchedCustomers);

  //       }else{
  //         return
  //       }

  //     },
  //     error: (err)=>{
  //       console.log(err);
  //     }
  //   });
  // }


  // {
  //   "id": 6,
  //   "mobile": "4356465434",
  //   "email": "tet@rew.dfs",
  //   "name": "vf",
  //   "status": null,
  //   "head_count": 0,
  //   "created_at": "2025-04-08T09:59:20.000000Z",
  //   "updated_at": "2025-04-08T09:59:20.000000Z",
  //   "deleted_at": null,
  //   "section_id": 2
  // }



  customerData = new FormGroup({
    email: new FormControl(this.data.waitingToken?.email, [
      Validators.required,
      Validators.email,
      this.whitespaceValidator,
    ]),
    name: new FormControl(this.data.waitingToken?.name, [Validators.required, this.whitespaceValidator]),
    mobile: new FormControl(this.data.waitingToken?.mobile, [
      Validators.required,
      Validators.pattern(this.mobilePattern),
    ]),
    headCount: new FormControl(this.data.waitingToken?.head_count, [
      Validators.required,
      Validators.min(1),
      Validators.max(75),
    ]),
    sectionId : new FormControl(this.data.waitingToken?.section_id, [
      Validators.required
    ]),
    id : new FormControl(this.data.waitingToken?.id),
  });

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getEmailError() {
    if (this.customerData.controls.email.hasError('email')) {
      return 'Invalid Email';
    }
    if (this.customerData.controls.email.hasError('required')) {
      return 'Please enter an email';
    }
    return;
  }
  getSectionError() {
    if (this.customerData.controls.sectionId.hasError('required')) {
      return 'Please select a section for waiting token';
    }
    return;
  }
  getNameError() {
    if (this.customerData.controls.name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.customerData.controls.name.hasError('whitespace')) {
      return 'Invalid name';
    }
    return;
  }
  getMobileError() {
    if (this.customerData.controls.mobile.hasError('required')) {
      return 'You must Mobile number';
    }
    if (this.customerData.controls.mobile.hasError('pattern')) {
      return 'Invalid mobile number entered';
    }
    return;
  }
  getHeadCountError() {
    if (this.customerData.controls.headCount.hasError('required')) {
      return 'You must enter the number of people';
    }
    if (this.customerData.controls.headCount.hasError('min')) {
      return 'Minimum 1 person required';
    }
    if (this.customerData.controls.headCount.hasError('max')) {
      return 'People cannot exceed 75 in single seating';
    }
    return;
  }

}
