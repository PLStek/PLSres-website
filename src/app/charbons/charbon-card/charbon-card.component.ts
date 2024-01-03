import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { UserService } from 'src/app/shared/services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CharbonEditionPopup } from 'src/app/actionner/charbon-edition-popup/charbon-edition-popup.component';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent {
  @Input() charbon!: Charbon;
  @Input() editable: boolean = false;

  constructor(
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
    this.modalService.show(CharbonEditionPopup, {
      class: 'modal-xl modal-dialog-centered',
      initialState: { editedCharbon: this.charbon },
    });
  }
}
