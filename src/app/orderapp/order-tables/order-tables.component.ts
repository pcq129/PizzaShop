import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TableSectionService } from 'src/app/_services/table-section.service';

@Component({
  selector: 'app-order-tables',
  templateUrl: './order-tables.component.html',
  styleUrls: ['./order-tables.component.scss'],
})
export class OrderTablesComponent implements OnInit {
  data: any = {
    code: '200',
    status: 'true',
    data: [
      {
        id: 1,
        name: 'Ground Floor',
        description: null,
        tables: [
          {
            id: 1,
            name: 'T1',
            section_id: 1,
            capacity: 3,
            status: 'Available',
          },
          {
            id: 2,
            name: 'T2',
            section_id: 1,
            capacity: 3,
            status: 'Available',
          },
          {
            id: 3,
            name: 'T3',
            section_id: 1,
            capacity: 3,
            status: 'Available',
          },
        ],
      },
      {
        id: 2,
        name: 'First Floor',
        description: null,
        tables: [
          {
            id: 4,
            name: 'T4',
            section_id: 2,
            capacity: 3,
            status: 'Available',
          },
          {
            id: 5,
            name: 'T5',
            section_id: 2,
            capacity: 4,
            status: 'Available',
          },
        ],
      },
      {
        id: 3,
        name: 'Third Floor',
        description: null,
        tables: [
          {
            id: 6,
            name: 'T6',
            section_id: 3,
            capacity: 4,
            status: 'Available',
          },
          {
            id: 7,
            name: 'T7',
            section_id: 3,
            capacity: 5,
            status: 'Available',
          },
        ],
      },
      {
        id: 4,
        name: 'AC Hall',
        description: null,
        tables: [
          {
            id: 8,
            name: 'T8',
            section_id: 4,
            capacity: 6,
            status: 'Available',
          },
          {
            id: 9,
            name: 'Y9',
            section_id: 4,
            capacity: 5,
            status: 'Available',
          },
        ],
      },
    ],
    messge: 'Section data fetched successfully',
  };
  constructor(
    private sectionService: TableSectionService,
    private snackbarService: SnackbarService
  ) {
    this.getSectionData();
  }

  ngOnInit(): void {}

  sectionData: any;
  getSectionData() {
    this.sectionService.getAllSectionData().subscribe({
      next: (res: any) => {
        if (res.status == false) {
          this.snackbarService.multipleErrors(res.message);
        } else {
          this.sectionData = res.data;
        }
      },
    });
  }

  selectedTables: number[] = [];
  currentSection: number = 0;
  assignable : boolean = true;
  runningTables = 0;
  selectTable(table: any, sectionId: any) {
    console.log(this.selectedTables);
    console.log('runnign' + this.runningTables);


    if(this.currentSection == 0){
      this.currentSection = sectionId;
      // this.customerData.controls.section.setValue(sectionId);
    }
    if(!this.selectedTables.includes(table.id) && sectionId == this.currentSection){
      console.log('!this.selectedTables.includes(table.id) && sectionId == this.currentSection');

      if(table.status != "Available"){
        console.log('table.status != "Available"');

        this.runningTables +=1;
        this.assignable = false;
      }
      this.selectedTables.push(table.id);
    }
    else if(this.selectedTables.includes(table.id)){
      let index = this.selectedTables.indexOf(table.id);
      this.selectedTables.splice(index, 1);
      if(table.status != "Available"){
        this.runningTables -=1;
        if(this.runningTables == 0){
          this.assignable = true;
        }
      }
    }

    if(sectionId != this.currentSection){
      this.snackbarService.error('Tables are from different Sections');
    }
  }

  mobilePattern = '^[0-9_-]{10,12}';
  customerData = new FormGroup({
    email: new FormControl("",[
      Validators.required,
      Validators.email,
      this.whitespaceValidator,
    ]),
    name: new FormControl("",[Validators.required, this.whitespaceValidator]),
    mobile: new FormControl("",[
      Validators.required,
      Validators.pattern(this.mobilePattern),
    ]),
    people: new FormControl("",[Validators.required, Validators.min(1), Validators.max(75)]),
    section: new FormControl("",[Validators.required]),
    section_id : new FormControl(``)
  });

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getEmailError() {
    if (this.customerData.controls.email.hasError('email')) {
      return 'Invalid Email';
    };
    return;
  }
  getNameError() {
    if (this.customerData.controls.name.hasError('required')) {
      return 'You must enter a name';
    };
    if (this.customerData.controls.name.hasError('whitespace')) {
      return 'Invalid name';
    };
    return;
}
  getMobileError() {
    if (this.customerData.controls.mobile.hasError('required')) {
      return 'You must Mobile number';
    };
    if(this.customerData.controls.mobile.hasError('pattern')){
      return 'Invalid mobile number entered'
    }
    return;
  }
  getPeopleError() {
    if (this.customerData.controls.people.hasError('required')) {
      return 'You must the number of people';
    };
    if (this.customerData.controls.people.hasError('min')) {
      return 'Minimum 1 person required';
    };
    if (this.customerData.controls.people.hasError('max')) {
      return 'People cannot exceed 75 in single seating';
    };
    return;
  }
  getSectionError() {
    if (this.customerData.controls.section.hasError('required')) {
      return 'Please select a section';
    };
    return;
  }


  clearSelection(){
    this.selectedTables = [];
    this.assignable = true;
    this.runningTables = 0;
    this.customerData.controls.section.setValue("");
  }


  assignTable(){
    console.log(this.customerData.value);
  }


  setCurrentSection(section: any){
    this.currentSection = section.id;
    this.customerData.controls.section.setValue(`${section.name}`);
    this.customerData.controls.section_id.setValue(section.id);
  }


}
