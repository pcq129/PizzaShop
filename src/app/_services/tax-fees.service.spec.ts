import { TestBed } from '@angular/core/testing';

import { TaxFeesService } from './tax-fees.service';

describe('TaxFeesService', () => {
  let service: TaxFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
