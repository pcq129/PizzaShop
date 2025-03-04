import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameByIdPipe } from 'src/helper/name-by-id.pipe';
import { CommonModuleComponent } from './common-module.component';

@NgModule({
  declarations: [NameByIdPipe, CommonModuleComponent],
  imports: [CommonModule],
  exports: [NameByIdPipe],
})
export class SharedModule {}
