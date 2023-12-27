import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
})
export class AccountPopupComponent {
  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
    this.bsModalRef.hide();
  }
}
