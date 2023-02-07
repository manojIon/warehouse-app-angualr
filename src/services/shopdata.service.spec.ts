import { TestBed } from '@angular/core/testing';

import { ShopdataService } from './shopdata.service';

describe('ShopdataService', () => {
  let service: ShopdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
