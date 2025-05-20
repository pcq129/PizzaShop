import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { LogarithmicScale } from 'chart.js';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';

import { TableSectionService } from './_services/table-section.service';
import { Section, Table } from './table-section';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { MatInput } from '@angular/material/input';
import { DeleteDialogComponent } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.component';
import { whitespaceValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss'],
})
export class TableSectionComponent implements OnInit {
  constructor(
    private sectionTableService: TableSectionService,
    private snackbarservice: SnackbarService,
    private dialog: MatDialog,
  ) {
    this.getSectionData();
    // this.getTableData();
  }

  @ViewChild('paginator') paginator!: PaginatorComponent;

  // group delete
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.tablesList.forEach((element: any) => {
        if (!this.selection.includes(element.id)) {
          this.selection.push(element.id);
        }
      });
    }
  }
  selection: number[] = [];
  isAllSelected() {
    return this.selection.length == this.tablesList.length;
  }
  selectTable(tableId: number) {
    if (this.selection.includes(tableId)) {
      let index = this.selection.indexOf(tableId);
      this.selection.splice(index, 1);
    } else {
      this.selection.push(tableId);
    }
    console.log(this.selection);
  }

  multipleDelete(selection: number[]) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: selection },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sectionTableService.multipleDelete(selection).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              this.snackbarservice.success(res.message);
              this.getTableDataBySection(this.currentSection);
              this.selection = [];
            } else {
              this.snackbarservice.error(res.message);
            }
          },
        });
      }
    });
  }

  ngOnInit(): void {}
  // displayedColumns = ['select', 'name', 'capacity', 'status', 'action'];
  tablesList: any;
  sectionsList: any; //fetch sections list from api
  currentSection: number = 0;

  refreshSectionList(e: boolean) {
    if (e == true) this.getSectionData();

    //refreshing table data (might be needed when deleting the section)
    // this.getTableData();
  }

  isSelected(id: number) {
    if (this.currentSection == id) {
      return true;
    }
    return false;
  }
  getSectionData() {
    return this.sectionTableService.getAllSectionData().subscribe({
      next: (res: any) => {
        if (!res.status) {
          this.snackbarservice.error(res.message);
        } else {
          this.sectionsList = res.data;
          this.currentSection = res.data[0].id;
          this.getTableDataBySection(this.currentSection);
          console.log(this.currentSection);
        }
        this.selection = [];
      },
      error: (error) => {
        // if this request returns error code 401(Unauthoized) then error will be handled by
        // headers interceptor automatically, (refer header Interceptor if this codeblock is
        // not accessible on errors)
        this.snackbarservice.error(error);
      },
    });
  }

  // getTableData() {
  //   return this.sectionTableService.getAllTableData().subscribe({
  //     next: (res: any) => {
  //       if (!res.status) {
  //         this.snackbarservice.error(res);
  //       } else {
  //         this.tablesList = res.data;
  //         this.viewTables = res.data;
  //       }
  //     },
  //     error: (error) => {
  //       //if this request returns error code 401(Unauthoized) then error will be handled by
  //       // headers interceptor automatically, (refer header Interceptor if this codeblock is
  //       // not accessible on errors)
  //       this.snackbarservice.error(error);
  //     },
  //   });
  // }

  resultsLength: number = 0;
  resetPaginator: boolean = false;
  getTableDataBySection(sectionId: number, pageChange?: any) {
    // this is where the first table data entry is fetched
    return this.sectionTableService
      .getTableDataBySection(sectionId, pageChange)
      .subscribe({
        next: (res: any) => {
          if (!res.status) {
            this.snackbarservice.error(res.message);
          } else {
            this.resetPaginator = true;
            this.tablesList = res.data.data;
            this.resultsLength = res.data.total;
            this.searchData = false;
            this.currentSection = sectionId;
            if (!pageChange) {
              this.paginator.resetToFirstPage();
            }
            this.selection = [];
          }
        },
        error: (error) => {
          // if this request returns error code 401(Unauthoized) then error will be handled by
          // headers interceptor automatically, (refer header Interceptor if this codeblock is
          // not accessible on errors)
          this.snackbarservice.error(error);
        },
      });
  }

  editSection(section: Section) {
    const id = section.id;
    const editDialog = this.dialog.open(SectionDialog, {
      width: '300px',
      data: {
        name: section.name,
        description: section.description,
      },
    });

    editDialog.afterClosed().subscribe((result: any) => {
      result.id = id;
      if (result.id && result.name) {
        this.sectionTableService.editSection(result).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Section updated successfully');
              // this.getSectionList.emit(true);
            }
          },
          error: (error: any) => {
            this.snackbarservice.success('Error updating section');
          },
        });
      } else {
        // this.snackbarservice.error('Error updating section');
        console.log(result);
      }
    });
  }

  addSection() {
    const addDialog = this.dialog.open(SectionDialog, {
      width: '300px',
      data: {
        name: '',
        description: '',
      },
    });

    addDialog.afterClosed().subscribe((result: any) => {
      if (result.name) {
        this.sectionTableService.addSection(result).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Section added successfully');
              // this.getSectionList.emit(true);
            }
          },
          error: (error: any) => {
            this.snackbarservice.success('Error adding section');
          },
        });
      } else {
        // this.snackbarservice.error('Error adding section');
        console.log(result);
      }
    });
  }

  deleteSection(section: Section) {
    console.log(section);

    const deleteDialog = this.dialog.open(SectionDeleteDialog, {
      width: '300px',
      data: {
        id: section.id,
        name: section.name,
        description: section.description,
      },
    });

    deleteDialog.afterClosed().subscribe((result: number) => {
      if (result) {
        this.sectionTableService.deleteSection(result).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Section deleted successfully');
              // this.getSectionList.emit(true);
            }
          },
          error: (error: any) => {
            this.snackbarservice.success('Error deleting section');
          },
        });
      } else {
        // this.snackbarservice.error('Error deleting section');
        console.log(result);
      }
    });
  }

  @ViewChild('tableSearch') tableSearch!: MatInput;
  resetSearch() {
    this.getTableDataBySection(this.currentSection);
    this.nodata = false;
    this.searchData = false;
  }

  perPage: number = 5;
  tablesColumns: string[] = ['select', 'name', 'capacity', 'status', 'actions'];

  nodata: boolean = true;
  searchData: boolean = false;
  tableName: string = '';
  searchTable(tableName: string, pageChange?: any) {
    if (tableName.length >= 1) {
      this.sectionTableService.searchTable(tableName, pageChange).subscribe({
        next: (res: any) => {
          if (!res.status) {
            this.nodata = true;
            this.tablesList = [];
            return;
          } else if (res.status) {
            this.nodata = false;
            this.tableName = tableName;
            this.tablesList = res.data.data;
            this.resultsLength = res.data.total;
            this.searchData = true;
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
      // this.getTableList.emit(true);
      this.nodata = false;
      console.log(this.nodata);
    }
  }

  pageChange(event: any) {
    if (this.searchData) {
      this.searchTable(this.tableName, event);
    } else {
      this.getTableDataBySection(this.currentSection, event);
    }
    this.selection = [];
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

    addDialog.afterClosed().subscribe((result: any) => {
      delete result.sectionsList;
      if (result.name && result.status && result.capacity) {
        this.sectionTableService.addTable(result).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Table added successfully');
              // this.getTableList.emit(true);
            }
          },
          error: (error: any) => {
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

    editDialog.afterClosed().subscribe((result: any) => {
      result.id = id;
      delete result.sectionsList;
      if (result.id && result.name && result.status && result.capacity) {
        this.sectionTableService.editTable(result).subscribe({
          next: (res: any) => {
            if (!res.status) {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Table updated successfully');
              // this.getTableList.emit(true);
            }
          },
          error: (error: any) => {
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
          this.sectionTableService.deleteTable(result).subscribe({
            next: (res: any) => {
              if (!res.status) {
                this.snackbarservice.error(res.message);
              } else {
                this.snackbarservice.success('Table deleted successfully');
                // this.getTableList.emit(true);
              }
            },
            error: (error: any) => {
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
  templateUrl: './dialog/table-dialog.html',
  styleUrls: ['./table-section.component.scss'],
})
export class TableDialog {
  constructor(
    public dialogRef: MatDialogRef<TableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  tableData = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      whitespaceValidator,
    ]),
    status: new FormControl(this.data.status, [Validators.required]),
    capacity: new FormControl(this.data.capacity, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    section_id: new FormControl(this.data.section_id),
  });

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
  templateUrl: './dialog/table-delete-dialog.html',
  styleUrls: ['./table-section.component.scss'],
})
export class TableDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<TableDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog/section-dialog.html',
  styleUrls: ['./table-section.component.scss'],
})
export class SectionDialog {
  constructor(
    public dialogRef: MatDialogRef<SectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Section,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sectionData = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      whitespaceValidator,
    ]),
    description: new FormControl(this.data.description),
  });

  getNameError() {
    if (this.sectionData.controls.name.hasError('required')) {
      return 'You must enter a name';
    }
    if (this.sectionData.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }

  getDescriptionError() {
    if (this.sectionData.controls.description.hasError('required')) {
      return 'You must enter a description';
    }
    if (this.sectionData.controls.name.hasError('whitespace')) {
      return 'Invalid input';
    }
    return;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog/section-delete-dialog.html',
  styleUrls: ['./table-section.component.scss'],
})
export class SectionDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<SectionDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Section,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
