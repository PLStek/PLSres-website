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
  difficulty: number = 0;

  constructor(private exerciseTopicService: ExerciseTopicService) {}

  ngOnInit(): void {
    this.exerciseTopicService.getExerciseTopicList().subscribe((data) => {
      return (this.exerciseTopicList = data.filter(
        (et) => et.exerciseCount > 0
      ));
    });
  }

  setDifficulty(difficulty: number): void {
    this.difficulty = difficulty;
    console.log(this.difficulty);
  }
}
