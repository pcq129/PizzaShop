import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KotComponent } from './kot.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    KotComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class KotModule { }
