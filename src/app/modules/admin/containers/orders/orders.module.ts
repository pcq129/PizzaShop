import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OrderDetailsModule } from './order-details/order-details.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { SharedModule } from 'src/app/shared/shared-module.module';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    OrderDetailsModule,
    MatPaginatorModule,
    CommonModule,
    SharedModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class OrdersModule {}
