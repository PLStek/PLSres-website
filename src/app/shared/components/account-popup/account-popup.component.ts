import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
})
export class AccountPopupComponent implements OnInit {
  loggedUser!: User;

  editPassword: boolean = false;

  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.loggedUser = this.bsModalRef.content.loggedUser;
    } else {
      this.bsModalRef.hide();
    }
  }

  logout() {
    this.authService.logout();
    this.bsModalRef.hide();
  }

  togglePasswordEdition() {
    this.editPassword = !this.editPassword;
  }
}
