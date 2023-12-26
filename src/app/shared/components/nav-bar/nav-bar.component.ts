import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AccountPopupComponent } from '../account-popup/account-popup.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loggedUser?: User;
  isToggled = false;

  modalRef?: BsModalRef;

  toggleClasses() {
    this.isToggled = !this.isToggled;
  }

  constructor(
    private modalService: BsModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.loggedUser = this.authService.getLoggedUser();
      console.log(this.loggedUser);
    }
  }

  openLoginForm() {
    this.modalRef = this.modalService.show(LoginPopupComponent, {
      class: 'modal-xl',
    });
  }

  openAccountForm() {
    this.modalRef = this.modalService.show(AccountPopupComponent, {
      class: 'modal-lg',
    });
  }
}
