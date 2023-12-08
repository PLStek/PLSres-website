import { TestBed } from '@angular/core/testing';

import { CharbonService } from './charbon.service';

describe('CharbonService', () => {
  let service: CharbonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharbonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
