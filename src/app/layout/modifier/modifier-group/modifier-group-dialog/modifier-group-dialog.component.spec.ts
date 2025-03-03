import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierGroupDialogComponent } from './modifier-group-dialog.component';

describe('ModifierGroupDialogComponent', () => {
  let component: ModifierGroupDialogComponent;
  let fixture: ComponentFixture<ModifierGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierGroupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
