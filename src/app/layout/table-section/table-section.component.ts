import { Component, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TableSectionService } from 'src/app/_services/table-section.service';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss'],
})
export class TableSectionComponent implements OnInit {


  constructor(
    private sectionTableService : TableSectionService,
    private snackbarservice : SnackbarService
  ) {
    this.getSectionData();
    this.getTableData();
  }

  ngOnInit(): void {}
  displayedColumns = ['name', 'capacity', 'status', 'action'];
  @Output() tablesList: any; //fetch table data from api
  sectionsList: any; //fetch sections list from api
  currentSection : number = 0;


  refreshSectionList(e : boolean){
    if(e == true)
    this.getSectionData();


    //refreshing table data (might be needed when deleting the section)
    this.getTableData();
  }
  refreshTableList($event: boolean) {
    if($event == true){
      this.getTableData();
    }
  }
  getSectionData() {
    return this.sectionTableService.getAllSectionData().subscribe(
      {
        next: (res : any)=>{
          if(res.status === "false"){
            this.snackbarservice.multipleErrors(res);
          }
          else{
            this.sectionsList = res.data;
            this.currentSection = res.data[0].id;
            console.log(this.currentSection);

          }

        },
        error: (error)=>{
          //if this request returns error code 401(Unauthoized) then error will be handled by
          // headers interceptor automatically, (refer header Interceptor if this codeblock is
          // not accessible on errors)
          this.snackbarservice.error(error);
        }
      }
    )
  };

  getTableData() {
    return this.sectionTableService.getAllTableData().subscribe(
      {
        next: (res : any)=>{
          if(res.status === "false"){
            this.snackbarservice.multipleErrors(res);
          }
          else{
            this.tablesList = res.data;
          }

        },
        error: (error)=>{
          //if this request returns error code 401(Unauthoized) then error will be handled by
          // headers interceptor automatically, (refer header Interceptor if this codeblock is
          // not accessible on errors)
          this.snackbarservice.error(error);
        }
      }
    )
  }

  getTableDataBySection(id: number) {
    return this.sectionTableService.getTableDataBySection(id).subscribe(
      {
        next: (res : any)=>{
          if(res.status === "false"){
            this.snackbarservice.multipleErrors(res);
          }
          else{
            this.tablesList = res.data.tables;
          }

        },
        error: (error)=>{
          //if this request returns error code 401(Unauthoized) then error will be handled by
          // headers interceptor automatically, (refer header Interceptor if this codeblock is
          // not accessible on errors)
          this.snackbarservice.error(error);
        }
      }
    )
  }

}



