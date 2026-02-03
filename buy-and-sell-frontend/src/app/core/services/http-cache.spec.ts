import { TestBed } from '@angular/core/testing';

import { HttpCache } from './http-cache';

describe('HttpCache', () => {
  let service: HttpCache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
