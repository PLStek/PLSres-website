import { Component, OnInit } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of, switchMap } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainButtonComponent } from '../main-button/main-button.component';

import { BackgroundCardComponent } from '../background-card/background-card.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  standalone: true,
  imports: [BackgroundCardComponent, ReactiveFormsModule, MainButtonComponent],
})
export class LoginPopupComponent {
  readonly DISCORD_AUTH_URL =
    'https://discord.com/api/oauth2/authorize?client_id=1207983799753904169&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Faccueil&scope=identify+guilds';

  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService
  ) {}

  discordAuthPage() {
    const popup = window.open(this.DISCORD_AUTH_URL, '_blank');

    const interval = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(interval);
        } else {
          const popupUrl = new URL(popup.location.href);
          const currentUrl = new URL(window.location.href);
          if (popupUrl.origin === currentUrl.origin) {
            const code = popupUrl.searchParams.get('code');
            if (code) {
              console.log(code);
              this.login(code);
              popup.close();
              clearInterval(interval);
            }
          }
        }
      } catch (e) {}
    }, 100);
  }

  login(code: string) {
    this.authService.login(code).subscribe(() => this.close());
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
