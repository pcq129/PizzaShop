import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFeesComponent } from './tax-fees.component';

describe('TaxFeesComponent', () => {
  let component: TaxFeesComponent;
  let fixture: ComponentFixture<TaxFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
