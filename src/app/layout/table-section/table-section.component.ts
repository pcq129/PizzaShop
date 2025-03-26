import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss'],
})
export class TableSectionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns = ['name', 'capacity', 'status', 'action'];
  tableData: any; //fetch table data from api
  sections: any; //fetch sections list from api
  value: any;

  
}
