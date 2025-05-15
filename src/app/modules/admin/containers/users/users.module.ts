import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogModule } from 'src/app/common/components/dialogs/delete-dialog/delete-dialog.module';
import { RoleLabelPipe } from 'src/app/common/pipes/role.pipe';
import { PhonePipe } from 'src/app/common/pipes/phone.pipe';
import { SharedModule } from 'src/app/common/common-module.module';

@NgModule({
  declarations: [UsersComponent, UserDialogComponent,RoleLabelPipe, PhonePipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    DeleteDialogModule,
    SharedModule
  ],
  providers: [],
  exports: [RoleLabelPipe, PhonePipe]
})
export class UsersModule {}
