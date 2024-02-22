import { BsModalService } from 'ngx-bootstrap/modal';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginPopupComponent } from '../components/login-popup/login-popup.component';
import { CanActivateFn } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const modalService = inject(BsModalService);

  return authService.isLogged();
};
