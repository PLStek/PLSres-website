import { Exercise } from 'src/app/shared/models/exercise.model';
import { Component, Input, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  @Input() exerciseTopic!: ExerciseTopic;
  exerciseList!: Exercise[];

  constructor(private exerciseService: ExerciseService) {
    this.exerciseList;
  }

  generateStars(count: number): string {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }

  ngOnInit(): void {
    this.exerciseService
      .getExercises({ topicId: this.exerciseTopic.id })
      .subscribe((data: Exercise[]) => {
        this.exerciseList = data;
      });
  }
}
