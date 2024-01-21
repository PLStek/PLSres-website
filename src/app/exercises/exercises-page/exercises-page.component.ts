import { Component, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';

@Component({
    selector: 'app-exercises-page',
    templateUrl: './exercises-page.component.html',
    styleUrls: ['./exercises-page.component.scss'],
    standalone: true,
    imports: [
        MainButtonComponent,
        RouterLink,
        BackgroundCardComponent,
        ExerciseListComponent,
    ],
})
export class ExercisesPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
