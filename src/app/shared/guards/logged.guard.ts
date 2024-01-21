import { BsModalService } from 'ngx-bootstrap/modal';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginPopupComponent } from '../components/login-popup/login-popup.component';

export const LoggedGuard = () => {
  const authService = inject(AuthService);
  const modalService = inject(BsModalService);

  return authService.isLogged().pipe(
    map((isLogged) => {
      if (!isLogged) {
        modalService.show(LoginPopupComponent, {
          class: 'modal-xl',
        });
      } 
      return isLogged;
    })
  );
}