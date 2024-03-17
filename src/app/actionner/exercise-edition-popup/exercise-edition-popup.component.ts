import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { AddExerciceComponent } from '../exercise-form/exercise-form.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-exercise-edition-popup',
  templateUrl: './exercise-edition-popup.component.html',
  styleUrls: ['./exercise-edition-popup.component.scss'],
  standalone: true,
  imports: [AddExerciceComponent],
})
export class ExerciseEditionPopupComponent {
  editedExercise!: Exercise;

  constructor(
    private bsModalRef: BsModalRef,
    private exerciseService: ExerciseService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  close(): void {
    this.bsModalRef.hide();
  }

  delete(): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) {
      this.exerciseService.deleteExercise(this.editedExercise.id).subscribe({
        next: () => {
          this.close();
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout(true);
          }
          this.toastr.error(
            "Erreur lors de la suppression de l'exercice",
            'Erreur'
          );
        },
      });
    }
  }
}
