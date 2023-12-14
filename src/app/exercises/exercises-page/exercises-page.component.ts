import { Component, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/services/exercise-topic.service';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss'],
})
export class ExercisesPageComponent implements OnInit {
  exerciseTopicList!: ExerciseTopic[];

  constructor(private exerciseTopicService: ExerciseTopicService) {}

  ngOnInit(): void {
    this.exerciseTopicList = this.exerciseTopicService.getExerciseTopicList();
  }
}
