import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameByIdPipe } from 'src/helper/name-by-id.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [NameByIdPipe, PageNotFoundComponent, PaginatorComponent],
  imports: [CommonModule, MatPaginatorModule],
  exports: [NameByIdPipe, PaginatorComponent],
})
export class SharedModule {}
