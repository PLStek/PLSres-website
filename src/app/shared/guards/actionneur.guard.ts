import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const actionneurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.getLoggedUser().pipe(
    map((user) => {
      if (user?.isActionneur) {
        return true;
      } else {
        return false;
      }
    })
  );
};
