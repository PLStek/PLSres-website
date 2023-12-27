import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginPopupComponent } from '../components/login-popup/login-popup.component';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLogged().pipe(
      map((isLogged) => {
        if (!isLogged) {
          this.modalService.show(LoginPopupComponent, {
            class: 'modal-xl',
          });
        } 
        return isLogged;
      })
    );
  }
}
