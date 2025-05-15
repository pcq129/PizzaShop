import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameByIdPipe } from './pipes/name-by-id.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [NameByIdPipe, PageNotFoundComponent, PaginatorComponent],
  imports: [CommonModule, MatPaginatorModule],
  exports: [NameByIdPipe, PaginatorComponent],
})
export class SharedModule {}
