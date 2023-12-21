import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddCharbonComponent } from '../add-charbon/add-charbon.component';
import { Charbon } from 'src/app/shared/models/charbon.model';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit {
  @Input() editedCharbon!: Charbon;

  constructor() {
    this.editedCharbon;
  }

  ngOnInit(): void {}
}
