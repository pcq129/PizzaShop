import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  waitingListData : any[]=[];



}
