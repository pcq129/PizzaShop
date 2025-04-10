import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';






@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.orderData = JSON.parse(this.data.order_data);
    this.formatTax(this.orderData);
  }

  onCancel(): void {
    this.data = null;
    this.dialogRef.close();
    console.log();
  }


  orderData : any;
  taxData: any[] = [];

  formatTax(data : any){
    for (const [key, value] of Object.entries(data.taxes)) {
      this.taxData.push([key, value])
    }
    console.log(this.taxData);

  }

  count = 0;
  counter(){
    this.count+=1;
    return this.count;
  }

  convertDate(isoDate: any) {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }


  calculateItemAmount(item: any){
    // {
    //   "item_id": 4,
    //   "item_name": "Aloo Tikki Burger",
    //   "item_rate": 384.2,
    //   "modifiers": [
    //     {
    //       "modifier_id": 4,
    //       "modifier_name": "BBQ",
    //       "modifier_rate": 50
    //     },
    //     {
    //       "modifier_id": 5,
    //       "modifier_name": "Alfredo",
    //       "modifier_rate": 200
    //     }
    //   ],
    //   "multiplier": 1
    // }
    let totalAmount = item.item_rate*item.multiplier;
    return totalAmount;
  }

  calculateModifierTotal(modifier: any, multiplier: number){
    return modifier.modifier_rate*multiplier;
  }

  totalRoundOff(amount : number){
    return Math.floor(amount);
  }


  generateInvoice(): void {
    // const dialogContent = document.getElementById('invoice');
    // const printContainer = document.getElementById('print-container');

    // if (!dialogContent || !printContainer) return;

    // const clone = dialogContent.cloneNode(true) as HTMLElement;
    // clone.style.display = 'block';
    // printContainer.innerHTML = '';
    // printContainer.appendChild(clone);

    // const opt = {
    //   margin: 0.5,
    //   filename: 'order-details.pdf',
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    //   jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    //   pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    // };

    // html2pdf().set(opt).from(clone).save().then(() => {
    //   printContainer.innerHTML = '';
    // });
  }


}