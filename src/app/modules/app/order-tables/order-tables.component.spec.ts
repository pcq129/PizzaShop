import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTablesComponent } from './order-tables.component';

describe('OrderTablesComponent', () => {
  let component: OrderTablesComponent;
  let fixture: ComponentFixture<OrderTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
