import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const actionneurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isActionneur().pipe(
    map((isActionneur) => {
      if (!isActionneur) {
        router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    })
  );
};
