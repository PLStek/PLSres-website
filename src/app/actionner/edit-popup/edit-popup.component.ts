import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Charbon } from 'src/app/shared/models/charbon.model';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit {
  editedCharbon!: Charbon;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.editedCharbon = this.bsModalRef.content.editedCharbon;
    }
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
