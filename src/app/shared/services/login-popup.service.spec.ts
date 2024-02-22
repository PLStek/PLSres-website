import { TestBed } from '@angular/core/testing';

import { LoginPopupService } from './login-popup.service';

describe('LoginPopupService', () => {
  let service: LoginPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
