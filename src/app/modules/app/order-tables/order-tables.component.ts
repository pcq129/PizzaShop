import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { TableSectionService } from '../../admin/containers/table-section/_services/table-section.service';
import { OrderService } from '../../admin/containers/orders/_services/order.service';

import { MatDialog } from '@angular/material/dialog';
import { waitingTokenDialog } from './dialogs/waitingTokenDialog.component';
import { whitespaceValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-order-tables',
  templateUrl: './order-tables.component.html',
  styleUrls: ['./order-tables.component.scss'],
})
export class OrderTablesComponent implements OnInit {
  data: any = {};
  constructor(
    private sectionService: TableSectionService,
    private snackbarService: SnackbarService,
    private router: Router,
    private tableSectionService: TableSectionService,
    private cdr: ChangeDetectorRef,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {
    this.getSectionData();
  }

  ngOnInit(): void {}

  sectionData: any;
  getSectionData() {
    this.sectionService.getAllSectionData().subscribe({
      next: (res: any) => {
        if (res.status == false) {
          this.snackbarService.error(res.message);
        } else {
          this.sectionData = res.data;
        }
      },
    });
  }

  capacityCount = 0;
  selectedTables: number[] = [];
  selectedTablesNames: string[] = [];
  currentSection: number = 0;
  currentSectionName: string = '';
  assignable: boolean = true;
  runningTables = 0;
  selectTable(table: any, sectionId: any) {
    if (this.currentSection == 0) {
      this.currentSection = sectionId;
      // this.customerData.controls.section.setValue(sectionId);
    }
    if (
      !this.selectedTables.includes(table.id) &&
      sectionId == this.currentSection
    ) {
      console.log(
        '!this.selectedTables.includes(table.id) && sectionId == this.currentSection'
      );

      if (table.status != 'Available') {
        console.log('table.status != "Available"');

        this.runningTables += 1;
        this.assignable = false;
      }
      this.selectedTables.push(table.id);
      this.capacityCount += table.capacity;
      console.log(this.capacityCount);

      this.selectedTablesNames.push(table.name);
    } else if (this.selectedTables.includes(table.id)) {
      let index = this.selectedTables.indexOf(table.id);
      let nameIndex = this.selectedTablesNames.indexOf(table.name);
      this.selectedTables.splice(index, 1);
      this.capacityCount -= table.capacity;
      this.selectedTablesNames.splice(nameIndex, 1);
      if (table.status != 'Available') {
        this.runningTables -= 1;
        if (this.runningTables == 0) {
          this.assignable = true;
        }
      }
    }

    if (sectionId != this.currentSection) {
      this.snackbarService.error('Tables are from different Sections');
    }
  }

  mobilePattern = '^[0-9_-]{10,12}';
  customerData = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      whitespaceValidator
    ]),
    name: new FormControl('', [Validators.required, whitespaceValidator]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(this.mobilePattern),
    ]),
    headCount: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(this.capacityCount),
    ]),
    section: new FormControl(this.currentSectionName, [Validators.required]),
    section_id: new FormControl(``),
    table_ids: new FormControl(this.selectedTables),
    table_names: new FormControl(this.selectedTablesNames),
  });

  setHeadCount(){
    this.customerData.controls.headCount.setValidators(Validators.max(this.capacityCount));
    this.customerData.controls.table_ids.setValue(this.selectedTables);
    this.customerData.controls.table_names.setValue(this.selectedTablesNames);
  }



  getEmailError() {
    if (this.customerData.controls.email.hasError('email')) {
      return 'Invalid Email';
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
      return 'People cannot exceed '+this.capacityCount+' in single seating';
    }
    return;
  }
  getSectionError() {
    if (this.customerData.controls.section.hasError('required')) {
      return 'Please select a section';
    }
    return;
  }

  setCurrentSection(section: any) {
    this.currentSection = section.id;
    this.currentSectionName = section.name;
    this.customerData.controls.section.patchValue(`${section.name}`);
    console.log(section.name);
    this.customerData.controls.section_id.setValue(section.id);
    this.capacityCount=0;
  }

  clearSelection() {
    this.currentSectionName = '';
    this.selectedTables = [];
    this.assignable = true;
    this.runningTables = 0;
    this.cdr.detectChanges();
  }

  createWaitingToken() {
    console.log('waitin token generatino');

    const newTokenDialog = this.dialog.open(waitingTokenDialog, {
      width: '600px',
      data: {
        sectionList: this.sectionData,
      },
    });

    newTokenDialog.afterClosed().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.sectionService.createWaitingToken(res).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarService.error(res.message);
              // this.router.navigateByUrl('order/menu');
            } else {
              this.snackbarService.success(res.message);
              // this.router.navigateByUrl('order/menu');
            }
          },
          error: (err) => {
            this.snackbarService.error(err);
          },
        });
      }
    });
  }

  cancelAssign(){
    this.customerData.reset();
    this.capacityCount=0;
    this.currentSection = 0;
    this.searchedCustomers = {};

  }

  assignTable(data: any) {
    //   {
    //     "email": "user@user.com",
    //     "name": "harmti",
    //     "mobile": 9477384958,
    //     "people": 3,
    //     "section": "Ground Floor",
    //     "section_id": 1,
    //     "table_ids": [
    //         11
    //     ]
    // }
    console.log(data);

    this.sectionService.assignTables(data).subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarService.error(res.message);
          this.router.navigate(['orderapp/menu']);
          console.log(data);
        } else {
          console.log(data);
          this.snackbarService.success(res.message);
          this.orderService.assignTable(data, res.data);
          this.router.navigate(['orderapp/menu']);
        }
      },
      error: (err) => {
        this.snackbarService.error(err);
      },
    });
  }

  tableStatusCounter(data: any) {
    //accumulator
    const counts = data.reduce((acc: any, table: any) => {
      const status = table.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts);
  }

  searchedCustomers: any = {};

  test: string = '';
  searchCustomer(email: string, sectionId: number) {
    if (email.length < 4) {
      this.searchedCustomers = {};
      return;
    }
    let data = {
      email: email,
      sectionId: sectionId,
    };
    this.tableSectionService.searchCustomer(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.searchedCustomers = res.data;
          console.log(this.searchedCustomers);
        } else {
          return;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadCustomerData(customer: any) {
    if(this.capacityCount >=   customer.head_count){
      this.customerData.controls.email.setValue(customer.email);
      this.customerData.controls.mobile.setValue(customer.mobile);
      this.customerData.controls.name.setValue(customer.name);
      this.customerData.controls.headCount.setValue(customer.head_count);
      this.customerData.controls.headCount.addValidators([Validators.required, Validators.min(1), Validators.max(this.capacityCount) ])
      this.customerData.controls['headCount'].updateValueAndValidity();
      return;
    }
    else{
      this.snackbarService.error("Please select more tables")
    }

  }
}
