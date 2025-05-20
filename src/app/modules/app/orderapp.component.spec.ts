import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderappComponent } from './orderapp.component';

describe('OrderappComponent', () => {
  let component: OrderappComponent;
  let fixture: ComponentFixture<OrderappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderappComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
