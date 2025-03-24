import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameByIdPipe } from 'src/helper/name-by-id.pipe';

@NgModule({
  declarations: [NameByIdPipe],
  imports: [CommonModule],
  exports: [NameByIdPipe],
})
export class SharedModule {}
