import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_services/dashboard.service';


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
  constructor(private dashboardService : DashboardService) {
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any)=>{
        this.dashboardData = res.data;
        this.waitingTimeHours =Math.floor(res.data.average_waiting_minutes/60);
        this.watitngTimeMinutes = res.data.average_waiting_minutes%60;
        console.log(res);

      },error: (err)=>{
        throw(err);
      }
    })
  }

  ngOnInit(): void {}

  dashboardData: any =  {
    "total_sales": 0,
    "order_count": 0,
    "waitinglist_count": 0,
    "average_waiting_minutes": 0,
    "new_customer_count": 0
};
  waitingTimeHours : any;
  watitngTimeMinutes:any;
}
