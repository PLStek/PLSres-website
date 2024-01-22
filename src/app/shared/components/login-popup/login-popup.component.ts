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

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  standalone: true,
  imports: [BackgroundCardComponent, ReactiveFormsModule, MainButtonComponent],
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
      emailOrUsername: new FormControl(''),
      password: new FormControl(''),
    });

    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@utbm.fr$'),
          ])
        ),
        username: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ])
        ),
        passwordConfirmation: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
          ])
        ),
      },
      { validators: this.checkPasswords }
    );
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      this.login();
    } else {
      //TODO: show message
      this.loginForm.setErrors({ invalidCredentials: true });
      console.log('Formulaire invalide');
    }
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;
    return password === passwordConfirmation
      ? null
      : { passwordMismatch: true };
  }

  login(): void {
    const emailOrUsername: string = this.loginForm.value.emailOrUsername;
    const password: string = this.loginForm.value.password;
    this.authService.login(emailOrUsername, password).subscribe((success) => {
      if (!success) {
        this.loginForm.setErrors({ invalidCredentials: true });
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
          this.registerForm.setErrors({ emailAlreadyExists: true });
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
