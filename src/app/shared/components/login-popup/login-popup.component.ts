import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainButtonComponent } from '../main-button/main-button.component';
import { environment } from 'src/environments/environment';
import { BackgroundCardComponent } from '../background-card/background-card.component';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  standalone: true,
  imports: [BackgroundCardComponent, ReactiveFormsModule, MainButtonComponent],
})
export class LoginPopupComponent {
  readonly DISCORD_HUB_URL = 'https://discord.gg/nMdXGCnM8J';
  readonly DISCORD_AUTH_URL = `${
    environment.apiURL
  }/auth/authorize/?redirect_uri=${encodeURIComponent(window.location.origin)}`;

  isLoading: boolean = false;

  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService
  ) {}

  openDiscordAuthPage() {
    const popup = window.open(this.DISCORD_AUTH_URL, '_blank');
    this.isLoading = true;

    const interval = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(interval);
          this.isLoading = false;
        } else {
          const popupUrl = new URL(popup.location.href);
          const currentUrl = new URL(window.location.href);
          if (popupUrl.origin === currentUrl.origin) {
            const code = popupUrl.searchParams.get('code');
            if (code) {
              this.login(code);
              popup.close();
              clearInterval(interval);
            } else {
              //TODO: handle error
            }
          }
        }
      } catch (e) {}
    }, 100);
  }

  openDiscordHub() {
    window.open(this.DISCORD_HUB_URL, '_blank');
  }

  login(code: string) {
    this.authService.login(code).subscribe(() => {
      this.isLoading = false;
      this.close();
    });
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
