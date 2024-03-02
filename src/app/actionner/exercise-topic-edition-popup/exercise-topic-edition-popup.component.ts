import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { ExerciseTopicFormComponent } from '../exercise-topic-form/exercise-topic-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise-topic-edition-popup',
  templateUrl: './exercise-topic-edition-popup.component.html',
  styleUrls: ['./exercise-topic-edition-popup.component.scss'],
  standalone: true,
  imports: [ExerciseTopicFormComponent],
})
export class ExerciseTopicEditionPopupComponent {
  editedExerciseTopic!: ExerciseTopic;

  constructor(
    private bsModalRef: BsModalRef,
    private exerciseTopicService: ExerciseTopicService,
    private toastr: ToastrService
  ) {}

  close(): void {
    this.bsModalRef.hide();
  }

  delete(): void {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette catégorie? L'intégralité des exercices qui lui sont associés seront supprimés."
      )
    ) {
      this.exerciseTopicService
        .deleteExerciseTopic(this.editedExerciseTopic.id)
        .subscribe({
          next: () => {
            this.close();
          },
          error: () => {
            this.toastr.error(
              'Erreur lors de la suppression de la catégorie',
              'Erreur'
            );
          },
        });
    }
  }
}
