import { Exercise } from 'src/models/exercise.model';
import { Component, Input, OnInit } from '@angular/core';
import { CourseType } from 'src/models/course-type.model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  @Input() exerciseList!: Exercise[];
  @Input() courseType!: CourseType;
  @Input() topic!: string;

  constructor() {
    this.exerciseList;
    this.courseType;
    this.topic;
  }

  generateStars(count: number): string {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }

  ngOnInit(): void {}
}
