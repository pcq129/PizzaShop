import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order-service.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private orderService : OrderService,
    private snackbarService : SnackbarService,
    private router : Router
  ) {
    this.orderService.currentOrderInvoice.subscribe({
      next: (res: any)=>{
        this.data = res;
        this.orderData = JSON.parse(res.order_data);
        this.formatTax(this.orderData);

        console.log(res);
        console.log(this.orderData);

      }
    })
   }

  ngOnInit(): void {

  }

  onCancel(): void {
    this.data = null;
  }

  redirect(url: string){
    this.router.navigateByUrl(url);
  }

  data : any;
  orderData : any;
  taxData: any[] = [];

  formatTax(data : any){
    for (const [key, value] of Object.entries(data.taxes)) {
      this.taxData.push([key, value])
    }
    console.log(this.taxData);

  }
  invoiceVisibility = false;
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


  // generateInvoice(): void {
  //   this.invoiceVisibility = !this.invoiceVisibility;
  //   const element = document.getElementById('invoicePdf');



  //   // const backButton = element?.querySelector('.backButton') as HTMLElement;
  //   // const exportButton = element?.querySelector('.exportBtn') as HTMLElement;
  //   // if (backButton) backButton.style.display = 'none';
  //   // if (exportButton) exportButton.style.display = 'none';

  //   // element?.classList.add('pdf-dark');


  //   if (!element) {
  //     console.error('Invoice element not found!');
  //     return;
  //   }

  //   const opt = {
  //     margin:       0.5,
  //     filename:     'invoice.pdf',
  //     image:        { type: 'jpeg', quality: 0.98 },
  //     html2canvas:  { scale: 2, backgroundColor: '#f5f5f5' },
  //     jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }
  //   };

  //   // @ts-ignore
  //   html2pdf().set(opt).from(element).save().then(()=>{
  //     setTimeout(() => {
  //   this.invoiceVisibility = !this.invoiceVisibility;


  //     }, 300);
  //   });
  // }

  generateInvoice(): void{
    const order = typeof this.orderData.order_data === 'string' ? JSON.parse(this.orderData.order_data) : this.orderData.order_data;


    // Generate table rows
    let rows = '';
    let count = 1;
    this.orderData.items.forEach((item : any) => {
      rows += `
        <tr>
          <td>${count}</td>
          <td>${item.item_name}</td>
          <td>${item.multiplier}</td>
          <td>${item.item_rate.toFixed(2)}</td>
          <td>${(item.item_rate * item.multiplier).toFixed(2)}</td>
        </tr>
      `;
      item.modifiers.forEach((mod : any) => {
        rows += `
          <tr>
            <td></td>
            <td style="padding-left: 20px;">${mod.modifier_name}</td>
            <td>${item.multiplier}</td>
            <td>${mod.modifier_rate.toFixed(2)}</td>
            <td>${(mod.modifier_rate * item.multiplier).toFixed(2)}</td>
          </tr>
        `;
      });
      count++;
    });

    const htmlContent = `
      <div id="invoicePdf" style=" font-family: Arial, sans-serif; padding: 20px; color: #000;">
    <div style="text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;">
      <img src="assets/logos/brandLogo.png" alt="Logo" style="height: 90px;
  display: inline;" />
      <h2 style="color: #0070c0;
      margin: 10px 0;
      display: inline;
      font-weight: 600;">PIZZASHOP</h2>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <strong>Customer Details</strong><br />
        Name: ${ this.data.customer.name }<br />
        Mob: ${this.data.customer.mobile}
      </div>
      <div>
        <strong>Order Details</strong><br />
        Invoice Number: #${ this.data.id }<br />
        Date: ${ this.convertDate(this.data.created_at) }<br />
        Section: ${ this.orderData.section_name }<br />
        Table: ${ this.orderData.table_names[0] }
      </div>
    </div>

    <table border="0" cellspacing="0" cellpadding="5" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
      <thead style="background-color: #0070c0; color: white;">
        <tr>
          <th>Sr.No.</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>

        <tbody *ngFor="let item of orderData.items; let i = index">
          <tr class="itemRow">
          ${rows}
          </tr>
        </tbody>




    </table>

    <div style="text-align: right; margin-right: 10px;">


      <p style="display: flex;
  justify-content: space-between;
  gap: 8px;"><strong>Sub Total :</strong><span> ${ this.orderData.subTotal.toFixed(2) }</span></p>
      <p style="display: flex;
  justify-content: space-between;
  gap: 8px;"><strong>CGST :</strong><span>${ this.orderData.taxes.CGST.toFixed(2) }</span></p>
      <p style="display: flex;
  justify-content: space-between;
  gap: 8px;"><strong>SGST :</strong><span>${ this.orderData.taxes.SGST.toFixed(2) }</span></p>
      <p style="display: flex;
  justify-content: space-between;
  gap: 8px;"><strong>GST :</strong><span>${ this.orderData.taxes.GST.toFixed(2) }</span></p>
      <h4 style="display: flex;
  justify-content: space-between;
  gap: 8px; color :#0070c0"><strong>Total Amount Due :</strong> ${ this.orderData.total.toFixed(2) }</h4>
    </div>

    <div style="margin-top: 30px;">
      <strong>Payment Information</strong><br />
      Payment Method: ${ this.data.payment_mode }
    </div>

    <div style="text-align: center; margin-top: 40px; font-weight: bold;">THANK YOU!</div>
  </div>

    `;

    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    const opt = {
      margin: 0.5,
      filename: `Invoice.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(container).save().then(() => {
      document.body.removeChild(container); // Clean up after export
    });
  }



}


// <td class="serial">${i+1}</td>
// <td class="itemName"><strong>${item.item_name}</strong></td>
// <td class="itemQuantity">${item.multiplier}</td>
// <td class="itemPrice">${item.item_rate}</td>
// <td class="itemAmount">${this.calculateItemAmount(item)}</td>-->



// <td></td>
// <td class="modifierName">• ${modifier.modifier_name}</td>
// <td class="modifierQuantity">${item.multiplier}</td>
// <td class="modifierPrice">${modifier.modifier_rate}</td>
// <td class="modifierAmount">${this.calculateModifierTotal(modifier, item.multiplier)}</td>

// <p style="justify-content: space-between;" class="taxEntry"><strong>Subtotal:</strong> ₹{{orderData.subTotal}}</p>

      // <p style="justify-content: space-between;"  class="taxEntry" *ngFor="let tax of  taxData"><strong class="floatLeft">{{tax[0]}} :</strong> ₹{{tax[1]}}</p>
