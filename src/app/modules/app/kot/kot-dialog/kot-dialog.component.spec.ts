import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotDialogComponent } from './kot-dialog.component';

describe('KotDialogComponent', () => {
  let component: KotDialogComponent;
  let fixture: ComponentFixture<KotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KotDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
