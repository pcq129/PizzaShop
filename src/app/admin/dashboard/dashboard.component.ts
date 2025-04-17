import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { OrderService } from 'src/app/_services/order-service.service';


export interface cardData{
  imageSource : string,
  mainData : string,
  secondaryData : string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cardOneData = {
    imageSource: '/assets/icons/waiting-time.svg',
    mainData: 'Rs 1630',
    secondaryData: 'Total Sales',
  };
  constructor(private orderService : OrderService) {
    this.orderData = this.orderService.getOrderData().subscribe({
      next: (res)=>{
        this.orderData = res;
      },error: (err)=>{
        throw(err);

      }
    })
  }

  ngOnInit(): void {}

  orderData: any;
}
