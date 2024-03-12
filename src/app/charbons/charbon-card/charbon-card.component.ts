import { CourseType } from 'src/app/shared/utils/course-type.model';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DateIntervalPipe } from '../../shared/pipes/date-interval.pipe';
import { ColorButtonComponent } from '../../shared/components/color-button/color-button.component';
import { NgClass, DatePipe, NgStyle } from '@angular/common';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { LoginPopupService } from 'src/app/shared/services/login-popup.service';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ColorButtonComponent,
    DatePipe,
    DateIntervalPipe,
    DurationPipe,
  ],
})
export class CharbonCardComponent implements OnChanges {
  @Input() charbon!: Charbon;
  @Input() actionneurs!: string[];
  @Input() editable: boolean = false;

  CourseType = CourseType;

  @Output() popupClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService,
    private charbonService: CharbonService,
    private loginPopupService: LoginPopupService
  ) {
    this.charbon;
    this.editable;
  }

  ngOnChanges() {
    this.getActionneurs();
  }

  getActionneurs() {
    this.userService.getActionneurs().subscribe({
      next: (actionneurs) => {
        this.actionneurs = actionneurs
          .filter((a) => this.charbon.actionneurs.includes(a.id))
          .map((a) => a.username);
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération des actionneurs',
          'Erreur'
        );
      },
    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  isPassed(): boolean {
    return this.charbon.date < new Date();
  }

  openEditPopup(): void {
    import(
      'src/app/actionner/charbon-edition-popup/charbon-edition-popup.component'
    ).then((module) => {
      const modalRef = this.modalService.show(module.CharbonEditionPopup, {
        class: 'modal-xl modal-dialog-centered',
        initialState: { editedCharbon: this.charbon },
      });

      modalRef.onHidden?.subscribe(() => {
        this.popupClosed.emit();
      });
    });
  }

  downloadContent() {
    this.charbonService.getCharbonContent(this.charbon.id).subscribe({
      next: (content) => {
        const url = window.URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = `[${this.charbon.course}] ${this.charbon.title}`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        if (error.status === 401) {
          this.loginPopupService.open();
        } else {
          this.toastr.error(
            'Erreur lors de la récupération du contenu du charbon',
            'Erreur'
          );
        }
      },
    });
  }
}
