import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './charbon-edition-popup.component.html',
  styleUrls: ['./charbon-edition-popup.component.scss'],
})
export class CharbonEditionPopup implements OnInit {
  editedCharbon!: Charbon;

  constructor(
    private bsModalRef: BsModalRef,
    private charbonService: CharbonService
  ) {}

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.editedCharbon = this.bsModalRef.content.editedCharbon;
    }
  }

  close(): void {
    this.bsModalRef.hide();
  }

  delete(): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce charbon ?')) {
      this.charbonService.deleteCharbon(this.editedCharbon.id).subscribe(() => {
        this.close();
      });
    }
  }
}
