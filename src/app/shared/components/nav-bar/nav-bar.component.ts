import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isConnected = false;
  isActionneur = true;
  isToggled = false;

  loginModalRef?: BsModalRef;

  toggleClasses() {
    this.isToggled = !this.isToggled;
  }

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openLoginForm() {
    this.loginModalRef = this.modalService.show(LoginPopupComponent, {
      class: 'modal-xl',
    });
  }
}
