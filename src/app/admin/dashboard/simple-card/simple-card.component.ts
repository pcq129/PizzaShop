import { Component, Input, OnInit } from '@angular/core';

interface cardData {
  imageSource: string;
  mainData: string;
  secondaryData: string;
}

@Component({
  selector: 'simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input()
  data: cardData = {
    imageSource: '',
    mainData: '',
    secondaryData: '',
  };

  imageSource = this.data.imageSource;
  mainData = this.data.mainData;
  secondaryData = this.data.secondaryData;

  log() {
    console.log(this.data);
  }
}
