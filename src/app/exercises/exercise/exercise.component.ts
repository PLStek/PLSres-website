import { Exercise } from 'src/models/exercise.model';
import { Component, Input, OnInit } from '@angular/core';
import { ExerciseTopic } from 'src/models/exercise-topic.model';
import { ExerciseService } from 'src/app/services/exercise.service';

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
    this.exerciseList = this.exerciseService.getExercisesByTopic(
      this.exerciseTopic.id
    );
  }
}
