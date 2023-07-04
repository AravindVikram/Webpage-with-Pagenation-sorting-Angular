import { TestBed } from '@angular/core/testing';

import { CounrtyService } from './counrty.service';

describe('CounrtyService', () => {
  let service: CounrtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounrtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
