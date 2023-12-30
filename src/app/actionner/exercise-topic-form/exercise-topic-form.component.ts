import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/shared/models/course.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-exercise-topic-form',
  templateUrl: './exercise-topic-form.component.html',
  styleUrls: ['./exercise-topic-form.component.scss'],
})
export class ExerciseTopicFormComponent implements OnInit {
  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: '',
      courseType: CourseType.undefined,
      course: '',
    });
  }

  validate(): void {}
}
