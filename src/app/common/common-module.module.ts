import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameByIdPipe } from 'src/helper/name-by-id.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [NameByIdPipe, PageNotFoundComponent],
  imports: [CommonModule],
  exports: [NameByIdPipe],
})
export class SharedModule {}
