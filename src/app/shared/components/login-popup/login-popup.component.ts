import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionneurService } from 'src/app/shared/services/actionneur.service';


@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  email_username: string = '';
  password: string = '';
  Email: string = '';
  username: string = '';
  Password: string = '';
  ConfirmPassword: string = '';

  constructor(private actionneurService: ActionneurService) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log('Email:', this.email_username);
    console.log('Mot de passe:', this.password);
  }

  register(): void {
    console.log('email:', this.Email);
    console.log('mot de passe:', this.Password);
    this.checkRegisterForm(this.Email, this.Password, this.ConfirmPassword);
  }

  private checkRegisterForm(email: string , password : string, ConfirmPassword : string): void {
    const utbmEmailRegex: RegExp = /@utbm\.fr$/;
    const isUtbmEmail: boolean = utbmEmailRegex.test(email);

    if (isUtbmEmail) {
      console.log('L\'email se termine par @utbm.fr');
    } else {
      console.log('L\'email ne se termine pas par @utbm.fr');
    }
    if (password === ConfirmPassword) {
      console.log('Les mots de passe correspondent');
    } else {
      console.log('Les mots de passe ne correspondent pas');
    }

  }
}
