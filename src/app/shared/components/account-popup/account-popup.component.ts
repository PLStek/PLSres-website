import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../../models/user.model';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MainButtonComponent } from '../main-button/main-button.component';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
  standalone: true,
  imports: [MainButtonComponent, ReactiveFormsModule],
})
export class AccountPopupComponent implements OnInit {
  loggedUser!: User;

  editPassword: boolean = false;

  passwordForm!: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)])
      ),
      newPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ])
      ),
      newPasswordConfirmation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ])
      ),
    });
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const newPasswordConfirmation = group.get('newPasswordConfirmation')?.value;

    return newPassword === newPasswordConfirmation
      ? null
      : { passwordMismatch: true };
  }

  logout() {
    this.authService.logout();
    this.bsModalRef.hide();
    this.router.navigate(['/accueil']);
  }

  togglePasswordEdition() {
    this.editPassword = !this.editPassword;
  }

  submitPasswordChange() {}
}
