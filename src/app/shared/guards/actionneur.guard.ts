import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const ActionneurGuard = () => {
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
}