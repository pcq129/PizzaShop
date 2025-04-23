import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { TableSectionService } from 'src/app/_services/table-section.service';
import { Section, Table } from '../table-section';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  constructor(
    private tablesectionservice: TableSectionService,
    private snackbarservice: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  @Input() tablesList: any;
  @Input() viewTablesList: any;
  @Input() sectionsList: any;
  @Output() getTableList = new EventEmitter<boolean>();
  tablesColumns: string[] = ['name', 'capacity', 'status', 'actions'];

  nodata: boolean = false;
  searchTable(tableName: string) {
    if (tableName.length >= 1) {
      this.tablesectionservice.searchTable(tableName).subscribe({
        next: (res: any) => {
          if (res.status == 'false') {
            this.nodata = true;
            this.tablesList = [];
            return;
          } else if (res.status == 'true') {
            this.nodata = false;

            this.tablesList = res.data;
            return;
          } else {
            this.nodata = true;
          }
        },
        error: (err: any) => {
          this.nodata = true;
          setTimeout(() => {
            this.tablesList = [];
          }, 1000);
        },
      });
    } else {
      this.getTableList.emit(true);
      this.nodata = false;
      console.log(this.nodata);
    }
  }

  addTable() {
    console.log(this.sectionsList);
    console.log(this.tablesList);

    const addDialog = this.dialog.open(TableDialog, {
      width: '300px',
      data: {
        sectionsList: this.sectionsList,
      },
    });

    addDialog.afterClosed().subscribe((result) => {
      delete result.sectionsList;
      if (result.name && result.status && result.capacity) {
        this.tablesectionservice.addTable(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.multipleErrors(res.message);
            } else {
              this.snackbarservice.success('Table added successfully');
              this.getTableList.emit(true);
            }
          },
          error: (error) => {
            this.snackbarservice.success('Error adding Table');
          },
        });
      } else {
        // this.snackbarservice.error('Error adding table');
        console.log(result);
      }
    });
  }

  editTable(table: Table) {
    const id = table.id;
    console.log(this.sectionsList);
    console.log(this.tablesList);

    const editDialog = this.dialog.open(TableDialog, {
      width: '300px',
      data: {
        id: table.id,
        name: table.name,
        status: table.status,
        capacity: table.capacity,
        section_id: table.section_id,
        sectionsList: this.sectionsList,
      },
    });

    editDialog.afterClosed().subscribe((result) => {
      result.id = id;
      delete result.sectionsList;
      if (result.id && result.name && result.status && result.capacity) {
        this.tablesectionservice.editTable(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.multipleErrors(res.message);
            } else {
              this.snackbarservice.success('Table updated successfully');
              this.getTableList.emit(true);
            }
          },
          error: (error) => {
            this.snackbarservice.success('Error updating table');
          },
        });
      } else {
        this.snackbarservice.error('Error updating table');
        console.log(result);
      }
    });
  }

  deleteTable(table: Table) {
    {
      console.log(table);

      if (table.status.toString() === 'Occupied') {
        this.snackbarservice.error('Table cannot be deleted when occupied');
        return;
      }

      const deleteDialog = this.dialog.open(TableDeleteDialog, {
        width: '318px',
        data: {
          id: table.id,
          name: table.name,
          status: table.status,
        },
      });

      deleteDialog.afterClosed().subscribe((result: number) => {
        if (result) {
          this.tablesectionservice.deleteTable(result).subscribe({
            next: (res: any) => {
              if (res.status === 'false') {
                this.snackbarservice.multipleErrors(res.message);
              } else {
                this.snackbarservice.success('Table deleted successfully');
                this.getTableList.emit(true);
              }
            },
            error: (error) => {
              this.snackbarservice.success('Error deleting Table');
            },
          });
        } else {
          // this.snackbarservice.error('Error deleting Table');
          console.log(result);
        }
      });
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'table-dialog.html',
  styleUrls: ['./tables.component.scss'],
})
export class TableDialog {
  constructor(
    public dialogRef: MatDialogRef<TableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  tableData = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    status: new FormControl(this.data.status, [Validators.required]),
    capacity: new FormControl(this.data.capacity, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    section_id: new FormControl(this.data.section_id),
  });

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getNameError() {
    if (this.tableData.controls.name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.tableData.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getCapacityError() {
    if (this.tableData.controls.capacity.hasError('pattern')) {
      return 'Capacity can only be in numbers';
    }
    if (this.tableData.controls.capacity.value > 25) {
      return 'Capacity cannot exceed 25';
    }
    return;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'table-delete-dialog.html',
  styleUrls: ['./tables.component.scss'],
})
export class TableDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<TableDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
