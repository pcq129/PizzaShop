import { Component, Inject , OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TaxFeesService } from 'src/app/_services/tax-fees.service';
import { TaxFees } from './tax-fees';

@Component({
  selector: 'app-tax-fees',
  templateUrl: './tax-fees.component.html',
  styleUrls: ['./tax-fees.component.scss']
})
export class TaxFeesComponent implements OnInit {

  constructor(private snackbarservice:SnackbarService,
    private taxfeeservice :TaxFeesService,
    private dialog: MatDialog
  ) {
    this.getTaxList();
  }

  ngOnInit(): void {
  }

  toggleEnabledState(tax: any, state: boolean, toggle: string){
    let data = {
      'state': state,
      'toggle': toggle
    }
    let taxId = tax.id;
      this.taxfeeservice.toggleTaxes(taxId, data).subscribe({
      next: (res)=>{
        this.getTaxList();
      },
      error: (error)=>{
        console.log(error);

      }
    })
  }

  taxList: any;
  getTaxList(){
    this.taxfeeservice.getAllTaxFeesData().subscribe({
      next: (res: any)=>{
        if(res.status == "false"){
          this.snackbarservice.multipleErrors(res.message);
        }
        else{
          console.log(res);

          this.taxList = res.data;
        }
      },
      error: (error)=>{
        this.snackbarservice.error("Error");
        console.log(error);

      }
    })
  }

  displayedColumns = ['name','amount', 'type', 'enabled', 'default', 'actions'];


  addTax() {
    const addDialog = this.dialog.open(TaxFeeDialog, {
      width: '300px',
      data: {
        enabled: 0,
        default: 0
      },
    });

    addDialog.afterClosed().subscribe((result) => {
      console.log(result);

      if (result.name && result.amount && result.type) {
        this.taxfeeservice.addTaxFees(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.multipleErrors(res.message);
            } else {
              this.snackbarservice.success('Tax added successfully');
              this.getTaxList();
            }
          },
          error: (error) => {
            this.snackbarservice.success('Error adding Tax');
          },
        });
      } else {
        // this.snackbarservice.error('Error adding tax');
        console.log(result);
      }
    });
  }

  editTax(tax : TaxFees) {
    console.log(tax);


    const editDialog = this.dialog.open(TaxFeeDialog, {
      width: '300px',
      data: {
        name : tax.name,
        type :tax.type,
        amount : tax.amount,
        enabled : tax.enabled,
        default : tax.default
      },
    });

    editDialog.afterClosed().subscribe((result) => {
      console.log(result);

      result.id = tax.id;
      if (result.id && result.name && result.amount && result.type) {
        this.taxfeeservice.editTaxFees(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.multipleErrors(res.message);
            } else {
              this.snackbarservice.success('Tax edited successfully');
              this.getTaxList();
            }
          },
          error: (error) => {
            this.snackbarservice.success('Error while editing Tax');
          },
        });
      } else {
        // this.snackbarservice.error('Error editing tax');
        console.log(result);
      }
    });
  }

  deleteTax(tax : TaxFees) {
    {
      console.log(tax);

      const deleteDialog = this.dialog.open(TaxFeeDeleteDialog, {
        width: '300px',
        data: {
          id: tax.id,
          name: tax.name,
        },
      });

      deleteDialog.afterClosed().subscribe((result: number) => {
        if (result) {
          this.taxfeeservice.deleteTaxFees(result).subscribe({
            next: (res: any) => {
              if (res.status === 'false') {
                this.snackbarservice.multipleErrors(res.message);
              } else {
                this.snackbarservice.success('Table deleted successfully');
                this.getTaxList();
              }
            },
            error: (error) => {
              this.snackbarservice.success('Error deleting Table');
            },
          });
        } else {
          // this.snackbarservice.error('Error deleting Table');
          console.log(result);
        }
      });
    }
  }
}







@Component({
  selector: 'tax-fees-dialog',
  templateUrl: 'tax-dialog.html',
  styleUrls: ['./tax-fees.component.scss'],
})
export class TaxFeeDialog {
  constructor(
    public dialogRef: MatDialogRef<TaxFeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  taxFeesData = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    type : new FormControl(this.data.type, Validators.required),
    amount: new FormControl(this.data.amount, [Validators.required]),
    enabled: new FormControl(this.data.enabled),
    default : new FormControl(this.data.default)
  });

  getTaxError(){
    if(this.taxFeesData.controls.type.value === "percentage" && this.taxFeesData.controls.amount.value>=50){
      return 'Tax percentage cannot exceed 50%'
    }
    return;
  }

  getNameError() {
    if (this.taxFeesData.controls.name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.taxFeesData.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  public taxValidator(control: FormControl){
    const taxPercentage = (control.value);
    if(taxPercentage>=50){
      console.log('invalid');
      return {taxValidator: true}
    }
    return {taxValidator: false};
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'tax-delete-dialog.html',
  styleUrls: ['./tax-fees.component.scss'],
})
export class TaxFeeDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<TaxFeeDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

