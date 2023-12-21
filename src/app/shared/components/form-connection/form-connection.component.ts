import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionneurService } from 'src/app/shared/services/actionneur.service';


@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.scss']
})
export class FormConnectionComponent implements OnInit {

  email: string = '';
  password: string = '';
  newEmail: string = '';
  newPassword: string = '';

  constructor(private actionneurService: ActionneurService) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);
    this.checkUTBMEmail(this.email);
  }

  register(): void {
    console.log('Nouvel email:', this.newEmail);
    console.log('Nouveau mot de passe:', this.newPassword);
    this.checkUTBMEmail(this.newEmail);
  }

  private checkUTBMEmail(email: string): void {
    const utbmEmailRegex: RegExp = /@utbm\.fr$/;
    const isUtbmEmail: boolean = utbmEmailRegex.test(email);

    if (isUtbmEmail) {
      console.log('L\'email se termine par @utbm.fr');
    } else {
      console.log('L\'email ne se termine pas par @utbm.fr');
    }
  }
}
