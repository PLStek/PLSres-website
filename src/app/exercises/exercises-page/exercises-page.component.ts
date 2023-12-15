import { Component, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';

@Component({
  selector: 'app-exercises-page',
  templateUrl: './exercises-page.component.html',
  styleUrls: ['./exercises-page.component.scss'],
})
export class ExercisesPageComponent implements OnInit {
  exerciseTopicList!: ExerciseTopic[];

  constructor(private exerciseTopicService: ExerciseTopicService) {}

  ngOnInit(): void {
    this.exerciseTopicService
      .getExerciseTopicList()
      .subscribe((exerciseTopics) => {
        return (this.exerciseTopicList = exerciseTopics);
      });
  }
}
