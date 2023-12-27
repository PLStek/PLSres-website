import { TestBed } from '@angular/core/testing';

import { ActionneurGuard } from './actionneur.guard';

describe('AuthGuard', () => {
  let guard: ActionneurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActionneurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
