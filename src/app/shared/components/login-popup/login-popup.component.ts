import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../services/auth.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
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
    this.authService.login(emailOrUsername, password).subscribe((response) => {
      console.log(this.authService.getLoggedUser());
    });
  }

  register(): void {
    const email: string = this.registerForm.value.email;
    const username: string = this.registerForm.value.username;
    const password: string = this.registerForm.value.password;
    this.authService
      .register(email, username, password)
      .pipe(
        switchMap((response) => {
          if (response) {
            return this.authService.login(username, password);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe((response) => {
        console.log(this.authService.getLoggedUser());
      });
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
