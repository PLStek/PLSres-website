import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MainButtonComponent } from '../main-button/main-button.component';
import { NgClass } from '@angular/common';
import { LoginPopupService } from '../../services/login-popup.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    RouterLinkActive,
    MainButtonComponent,
    CollapseModule,
  ],
})
export class NavBarComponent implements OnInit {
  isLogged?: boolean;
  isActionneur?: boolean;
  isCollapsed = true;

  constructor(
    public loginPopupService: LoginPopupService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLogged().subscribe((res) => (this.isLogged = res));

    this.authService
      .isActionneur()
      .subscribe((res) => (this.isActionneur = res));
  }

  isActionneurRoute(): boolean {
    return this.router.url.includes('actionner');
  }

  logout() {
    this.authService.logout();
  }
}
