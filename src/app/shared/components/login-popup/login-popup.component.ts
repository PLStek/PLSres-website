import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of, switchMap } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailOrUsername: '',
      password: '',
    });

    this.registerForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    });
  }

  login(): void {
    const emailOrUsername: string = this.loginForm.value.emailOrUsername;
    const password: string = this.loginForm.value.password;
    this.authService
      .login(emailOrUsername, password)
      .subscribe((success) => this.closeIfSuccessful(success));
  }

  register(): void {
    const email: string = this.registerForm.value.email;
    const username: string = this.registerForm.value.username;
    const password: string = this.registerForm.value.password;
    this.authService
      .register(email, username, password)
      .pipe(
        switchMap((success) => {
          console.log(success);
          if (success) {
            return this.authService.login(email, password);
          } else {
            return of(false);
          }
        })
      )
      .subscribe((success) => this.closeIfSuccessful(success));
  }

  private closeIfSuccessful(success: boolean): void {
    if (success) {
      this.bsModalRef.hide();
    }
  }

  /* private checkRegisterForm(
    email: string,
    password: string,
    ConfirmPassword: string
  ): void {
    const utbmEmailRegex: RegExp = /@utbm\.fr$/;
    const isUtbmEmail: boolean = utbmEmailRegex.test(email);

    if (isUtbmEmail) {
      console.log("L'email se termine par @utbm.fr");
    } else {
      console.log("L'email ne se termine pas par @utbm.fr");
    }
    if (password === ConfirmPassword) {
      console.log('Les mots de passe correspondent');
    } else {
      console.log('Les mots de passe ne correspondent pas');
    }
  } */
}
