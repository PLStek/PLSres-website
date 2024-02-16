import { loggedGuard } from './logged.guard';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

describe('testGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
