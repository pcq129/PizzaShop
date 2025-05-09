import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, AfterViewInit {
  resetToFirstPage() {
    this.paginator.firstPage();
  }
  @Input()
  length: number = 5;
  @Input()
  pageSize: number = 5;

  @Output()
  pageChange = new EventEmitter<any>();
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor() {}
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {}

  onPageChange(pageChange: PageEvent) {
    //   {
    //     "previousPageIndex": 0,
    //     "pageIndex": 1,
    //     "pageSize": 5,
    //     "length": 14
    // }
    this.pageChange.emit(pageChange);
    console.log(pageChange);
    this.ngOnInit();

  }
}
