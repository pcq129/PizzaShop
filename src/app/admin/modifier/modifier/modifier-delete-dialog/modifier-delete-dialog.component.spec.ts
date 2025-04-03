import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDeleteDialogComponent } from './modifier-delete-dialog.component';

describe('ModifierDeleteDialogComponent', () => {
  let component: ModifierDeleteDialogComponent;
  let fixture: ComponentFixture<ModifierDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
