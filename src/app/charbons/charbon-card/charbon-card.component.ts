import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CharbonEditionPopup } from 'src/app/actionner/charbon-edition-popup/charbon-edition-popup.component';
import { DateIntervalPipe } from '../../shared/pipes/date-interval.pipe';
import { ColorButtonComponent } from '../../shared/components/color-button/color-button.component';
import { NgClass, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-charbon-card',
    templateUrl: './charbon-card.component.html',
    styleUrls: ['./charbon-card.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        ColorButtonComponent,
        DatePipe,
        DateIntervalPipe,
    ],
})
export class CharbonCardComponent  {
  @Input() charbon!: Charbon;
  @Input() editable: boolean = false;

  @Output() popupClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: BsModalService) {
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
    const modalRef = this.modalService.show(CharbonEditionPopup, {
      class: 'modal-xl modal-dialog-centered',
      initialState: { editedCharbon: this.charbon },
    });

    modalRef.onHidden?.subscribe(() => {
      this.popupClosed.emit();
    });
  }
}
