import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cardOneData = {
    imageSource: '../../../src/assets/icons/waiting-time.svg',
    mainData: 'Rs 1630',
    secondaryData: 'Total Sales',
  };
  constructor() {}

  ngOnInit(): void {}
}
