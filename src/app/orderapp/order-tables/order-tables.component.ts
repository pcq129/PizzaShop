import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TableSectionService } from 'src/app/_services/table-section.service';

@Component({
  selector: 'app-order-tables',
  templateUrl: './order-tables.component.html',
  styleUrls: ['./order-tables.component.scss']
})
export class OrderTablesComponent implements OnInit {


  data : any = {
    "code": "200",
    "status": "true",
    "data": [
        {
            "id": 1,
            "name": "Ground Floor",
            "description": null,
            "tables": [
                {
                    "id": 1,
                    "name": "T1",
                    "section_id": 1,
                    "capacity": 3,
                    "status": "Available"
                },
                {
                    "id": 2,
                    "name": "T2",
                    "section_id": 1,
                    "capacity": 3,
                    "status": "Available"
                },
                {
                    "id": 3,
                    "name": "T3",
                    "section_id": 1,
                    "capacity": 3,
                    "status": "Available"
                }
            ]
        },
        {
            "id": 2,
            "name": "First Floor",
            "description": null,
            "tables": [
                {
                    "id": 4,
                    "name": "T4",
                    "section_id": 2,
                    "capacity": 3,
                    "status": "Available"
                },
                {
                    "id": 5,
                    "name": "T5",
                    "section_id": 2,
                    "capacity": 4,
                    "status": "Available"
                }
            ]
        },
        {
            "id": 3,
            "name": "Third Floor",
            "description": null,
            "tables": [
                {
                    "id": 6,
                    "name": "T6",
                    "section_id": 3,
                    "capacity": 4,
                    "status": "Available"
                },
                {
                    "id": 7,
                    "name": "T7",
                    "section_id": 3,
                    "capacity": 5,
                    "status": "Available"
                }
            ]
        },
        {
            "id": 4,
            "name": "AC Hall",
            "description": null,
            "tables": [
                {
                    "id": 8,
                    "name": "T8",
                    "section_id": 4,
                    "capacity": 6,
                    "status": "Available"
                },
                {
                    "id": 9,
                    "name": "Y9",
                    "section_id": 4,
                    "capacity": 5,
                    "status": "Available"
                }
            ]
        }
    ],
    "messge": "Section data fetched successfully"
}
  constructor(
    private sectionService : TableSectionService,
    private snackbarService : SnackbarService
  ) {
    this.getSectionData();
   }

  ngOnInit(): void {
  }

  sectionData: any;
  getSectionData(){
    this.sectionService.getAllSectionData().subscribe({
      next: (res: any)=>{
        if(res.status == false){
          this.snackbarService.multipleErrors(res.message);
        }
        else{
          this.sectionData = res.data;
        }
      }
    })
  }


  selectedTalbes : number[] = [];
  selectTable(tableId: number){

  }

}
