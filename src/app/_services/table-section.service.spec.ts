import { TestBed } from '@angular/core/testing';

import { TableSectionService } from './table-section.service';

describe('TableSectionService', () => {
  let service: TableSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
