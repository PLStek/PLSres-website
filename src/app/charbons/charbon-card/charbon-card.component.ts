import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { UserService } from 'src/app/shared/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditPopupComponent } from 'src/app/actionner/edit-popup/edit-popup.component';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent {
  @Input() charbon!: Charbon;
  @Input() editable: boolean = false;

  editModalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {
    this.charbon;
    this.editable;
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  isPassed(): boolean {
    return this.charbon.date < new Date();
  }

  openEditPopup(): void {
    this.editModalRef = this.modalService.show(EditPopupComponent, {
      class: 'modal-xl modal-dialog-centered',
      initialState: { editedCharbon: this.charbon },
    });
  }

  closeEditPopup(): void {
    this.editModalRef?.hide();
  }
}
