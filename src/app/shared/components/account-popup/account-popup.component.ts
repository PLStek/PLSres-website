import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
})
export class AccountPopupComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
