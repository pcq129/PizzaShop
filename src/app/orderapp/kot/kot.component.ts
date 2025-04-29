import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KotService } from 'src/app/_services/kot.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-kot',
  templateUrl: './kot.component.html',
  styleUrls: ['./kot.component.scss']
})
export class KotComponent implements OnInit {

  constructor(
    private kotService: KotService,
    private snackbarService: SnackbarService
  ) {
    this.getKotData();
  }

  ngOnInit(): void {

  }

  orderData:any;


  kotData:any;


  getKotData(){
    this.kotService.getKotData().subscribe({
      next: (res: any)=>{
        if(res.status=="true"){
          this.kotData = res.data;
          console.log(this.kotData);
          this.formatData();
        }else{
          this.snackbarService.error("Error fetching KOTs")
        }
      }
    })
  }

  formatData(){
    this.kotData.forEach((category: any) => {
      category.kots.forEach((kot: any) => {
        kot.item_data = JSON.parse(kot.item_data);
      });

      // let order_data = JSON.parse(kot.order.order_data);
      // console.log(order_data);
    });
    console.log(this.kotData);
  }

  getTimeDifference(time: string){
    const kotTime = new Date(time);
    const currentTime = new Date();

    const diffMs = currentTime.getTime() - kotTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours} Hours, ${minutes} Minutes`;
  }

}
