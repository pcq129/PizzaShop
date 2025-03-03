import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  data: any = {};

  imageSource = this.data.imageSource;
  mainData = this.data.mainData;
  secondaryData = this.data.secondaryData;
}
