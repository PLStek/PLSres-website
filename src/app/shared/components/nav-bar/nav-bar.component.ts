import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MainButtonComponent } from '../main-button/main-button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [RouterLink, NgClass, RouterLinkActive, MainButtonComponent],
})
export class NavBarComponent implements OnInit {
  isLogged?: boolean;
  isActionneur?: boolean;
  isToggled = false;

  toggleClasses() {
    this.isToggled = !this.isToggled;
  }

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLogged().subscribe((res) => (this.isLogged = res));

    this.authService
      .isActionneur()
      .subscribe((res) => (this.isActionneur = res));
  }

  openLoginPopup() {
    this.modalService.show(LoginPopupComponent, {
      class: 'modal-lg',
    });
  }

  isActionneurRoute(): boolean {
    return this.router.url.includes('actionner');
  }

  logout() {
    this.authService.logout();
  }
}
