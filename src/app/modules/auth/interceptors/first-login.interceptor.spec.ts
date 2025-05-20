import { TestBed } from '@angular/core/testing';

import { FirstLoginInterceptor } from './first-login.interceptor';

describe('FirstLoginInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FirstLoginInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: FirstLoginInterceptor = TestBed.inject(
      FirstLoginInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
