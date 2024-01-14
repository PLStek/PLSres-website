import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@utbm.fr$'),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
        passwordConfirmation: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ],
        ],
      },
      { validators: this.checkPasswords }
    );
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      this.login();
    } else {
      //TODO: show message
      this.loginForm.setErrors({ 'invalidCredentials': true });
      console.log('Formulaire invalide');
    }
  }

  checkPasswords(group: FormGroup) {
    if (
      group.get('password')?.value !==
      group.get('passwordConfirmation')?.value
    ) {
      return { 'passwordMismatch': true };
    } else {
      return null;
    }
  }

  login(): void {
    const emailOrUsername: string = this.loginForm.value.emailOrUsername;
    const password: string = this.loginForm.value.password;
    this.authService
      .login(emailOrUsername, password)
      .subscribe((success) => {
        if (!success) {
          this.loginForm.setErrors({ 'invalidCredentials': true });
        } else {
          this.closeIfSuccessful(success);
        }
      });
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      this.register();
    }
  }

  register(): void {
    const email: string = this.registerForm.value.email;
    const username: string = this.registerForm.value.username;
    const password: string = this.registerForm.value.password;
    this.authService
      .register(email, username, password)
      .pipe(
        switchMap((success) =>
          success ? this.authService.login(email, password) : of(false)
        )
      )
      .subscribe((success) => {
        if (!success) {
          this.registerForm.setErrors({ 'emailAlreadyExists': true });
        } else {
          this.closeIfSuccessful(success);
        }
      });
  }

  private closeIfSuccessful(success: boolean): void {
    if (success) {
      this.bsModalRef.hide();
    }
  }
}
