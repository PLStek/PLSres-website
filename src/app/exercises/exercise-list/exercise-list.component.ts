import { Component, Input, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  @Input() editable = false;

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
