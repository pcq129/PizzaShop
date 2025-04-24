import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Section } from '../table-section';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TableSectionService } from 'src/app/_services/table-section.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, OnChanges {
  constructor(
    public dialog: MatDialog,
    private tablesectionservice: TableSectionService,
    private snackbarservice: SnackbarService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  @Input()
  sectionsList: any;

  @Output()
  sectionId = new EventEmitter<number>();

  @Output()
  getSectionList = new EventEmitter<boolean>();
  getTables(sectionId: number) {
    this.sectionId.emit(sectionId);
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

    editDialog.afterClosed().subscribe((result) => {
      result.id = id;
      if (result.id && result.name) {
        this.tablesectionservice.editSection(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Section updated successfully');
              this.getSectionList.emit(true);
            }
          },
          error: (error) => {
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

    addDialog.afterClosed().subscribe((result) => {
      if (result.name) {
        this.tablesectionservice.addSection(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Section added successfully');
              this.getSectionList.emit(true);
            }
          },
          error: (error) => {
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

    const  deleteDialog = this.dialog.open(SectionDeleteDialog, {
      width: '300px',
      data: {
        id: section.id,
        name: section.name,
        description: section.description,
      },
    });

    deleteDialog.afterClosed().subscribe((result:number) => {
      if (result) {
        this.tablesectionservice.deleteSection(result).subscribe({
          next: (res: any) => {
            if (res.status === 'false') {
              this.snackbarservice.error(res.message);
            } else {
              this.snackbarservice.success('Section deleted successfully');
              this.getSectionList.emit(true);
            }
          },
          error: (error) => {
            this.snackbarservice.success('Error deleting section');
          },
        });
      } else {
        // this.snackbarservice.error('Error deleting section');
        console.log(result);
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'section-dialog.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionDialog {
  constructor(
    public dialogRef: MatDialogRef<SectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sectionData = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      this.whitespaceValidator,
    ]),
    description: new FormControl(this.data.description),
  });

  public whitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

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
  templateUrl: 'section-delete-dialog.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<SectionDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Section
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
