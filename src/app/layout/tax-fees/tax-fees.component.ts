import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-fees',
  templateUrl: './tax-fees.component.html',
  styleUrls: ['./tax-fees.component.scss']
})
export class TaxFeesComponent implements OnInit {
dataSource: any;
displayedColumns: any;

  constructor() { }

  ngOnInit(): void {
  }

}
