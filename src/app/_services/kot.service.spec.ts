import { TestBed } from '@angular/core/testing';

import { KotService } from './kot.service';

describe('KotService', () => {
  let service: KotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
