import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseTopicFormComponent } from '../exercise-topic-form/exercise-topic-form.component';
import { AddExerciceComponent } from '../exercise-form/exercise-form.component';
import { AddCharbonComponent } from '../charbon-form/charbon-form.component';
import { BackgroundCardComponent } from '../../shared/components/background-card/background-card.component';

@Component({
  selector: 'app-actionner-home-page',
  templateUrl: './actionner-home-page.component.html',
  styleUrls: ['./actionner-home-page.component.scss'],
  standalone: true,
  imports: [
    BackgroundCardComponent,
    AddCharbonComponent,
    AddExerciceComponent,
    ExerciseTopicFormComponent,
  ],
})
export class ActionnerHomePageComponent implements OnInit {
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {}
}
