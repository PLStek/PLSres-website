import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExerciseEditionPopupComponent } from '../exercise-edition-popup/exercise-edition-popup.component';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseListComponent } from '../../exercises/exercise-list/exercise-list.component';
import { ExerciseTopicFormComponent } from '../exercise-topic-form/exercise-topic-form.component';
import { AddExerciceComponent } from '../exercise-form/exercise-form.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';

@Component({
    selector: 'app-exercise-edition-page',
    templateUrl: './exercise-edition-page.component.html',
    styleUrls: ['./exercise-edition-page.component.scss'],
    standalone: true,
    imports: [
        MainButtonComponent,
        RouterLink,
        BackgroundCardComponent,
        AddExerciceComponent,
        ExerciseTopicFormComponent,
        ExerciseListComponent,
    ],
})
export class ExerciseEditionPageComponent implements OnInit {
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }
}
