import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginPopupComponent } from '../components/login-popup/login-popup.component';

@Injectable({
  providedIn: 'root',
})
export class LoginPopupService {
  constructor(private modalService: BsModalService) {}

  modalRef?: BsModalRef;

  open(onHidden?: () => void): BsModalRef {
    this.modalRef = this.modalService.show(LoginPopupComponent, {
      class: 'modal-lg',
    });

    if (onHidden) {
      this.modalRef.onHidden?.subscribe(onHidden);
    }

    return this.modalRef;
  }

  close() {
    this.modalRef?.hide();
  }
}
