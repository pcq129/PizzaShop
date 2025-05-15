import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from './_services/dashboard.service';

export interface cardData {
  imageSource: string;
  mainData: string;
  secondaryData: string;
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
  constructor(private dashboardService: DashboardService) {
    this.getDashboardData(3);
  }

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // allows height to be controlled via CSS
  };

  getDashboardData(filter?: number) {
    console.log(filter);

    this.dashboardService.getDashboardData(filter).subscribe({
      next: (res: any) => {
        this.dashboardData = res.data;
        console.log(res.data);

        if(isNaN(res.average_waiting_minutes)){
          this.waitingTimeHours = 0;
          this.watitngTimeMinutes = 0;
        }else{
          this.waitingTimeHours = Math.floor(
            res.data.average_waiting_minutes / 60
          );
          this.watitngTimeMinutes = res.data.average_waiting_minutes % 60;
        }


        this.revenueChart = {
          labels: this.dashboardData.revenue.labels,
          datasets: [
            {
              label: 'Sales',
              data: this.dashboardData.revenue.data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              tension: 0.5,
            },
          ],
        };
        this.customerGrowthChart = {
          labels: this.dashboardData.customer_growth.labels,
          datasets: [
            {
              label: 'Growth',
              data: this.dashboardData.customer_growth.data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              tension: 0.5,
            },
          ],
        };
      },
      error: (err) => {
        throw err;
      },
    });
  }
  currentState: string = '3';
  selected = new FormControl(this.currentState);

  ngOnInit(): void {}

  calculateAverageOrder() {
    let average_order = Math.floor(
      this.dashboardData.total_sales / this.dashboardData.order_count
    );
    console.log(average_order);

    return isNaN(average_order) ? 0 : average_order;
  }

  dashboardData: any = {
    total_sales: 0,
    order_count: 0,
    averate_order: 0,
    waitinglist_count: 0,
    average_waiting_minutes: 0,
    new_customer_count: 0,
  };
  waitingTimeHours: any;
  watitngTimeMinutes: any;
  revenueChart: any;
  customerGrowthChart: any;
}
