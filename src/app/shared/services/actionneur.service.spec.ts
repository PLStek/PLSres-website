import { TestBed } from '@angular/core/testing';

import { ActionneurService } from './actionneur.service';

describe('ActionneurService', () => {
  let service: ActionneurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionneurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
