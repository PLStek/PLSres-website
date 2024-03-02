import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { AddCharbonComponent } from '../charbon-form/charbon-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './charbon-edition-popup.component.html',
  styleUrls: ['./charbon-edition-popup.component.scss'],
  standalone: true,
  imports: [AddCharbonComponent],
})
export class CharbonEditionPopup {
  editedCharbon!: Charbon;

  constructor(
    private bsModalRef: BsModalRef,
    private charbonService: CharbonService,
    private toastr: ToastrService
  ) {}

  close(): void {
    this.bsModalRef.hide();
  }

  delete(): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce charbon ?')) {
      this.charbonService.deleteCharbon(this.editedCharbon.id).subscribe({
        next: () => {
          this.close();
        },
        error: (error) => {
          this.toastr.error(
            'Erreur lors de la suppression du charbon',
            'Erreur'
          );
        },
      });
    }
  }
}
