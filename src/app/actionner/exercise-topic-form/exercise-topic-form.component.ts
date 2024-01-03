import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/shared/models/course.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { ExerciseTopicPostParameters } from 'src/app/shared/models/exercise-topic-post-parameters';

@Component({
  selector: 'app-exercise-topic-form',
  templateUrl: './exercise-topic-form.component.html',
  styleUrls: ['./exercise-topic-form.component.scss'],
})
export class ExerciseTopicFormComponent implements OnInit {
  @Input() baseExerciseTopic?: ExerciseTopic;
  @Output() onValidate = new EventEmitter<void>();

  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseTopicService: ExerciseTopicService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.initForm(this.baseExerciseTopic);

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.updateCourseList();
    });

    this.form.get('courseType')?.valueChanges.subscribe((data) => {
      this.updateCourseList();
      this.form.get('course')?.setValue('');
    });
  }

  initForm(baseExerciseTopic?: ExerciseTopic): void {
    if (baseExerciseTopic) {
      this.form = this.formBuilder.group({
        title: baseExerciseTopic.topic,
        course: baseExerciseTopic.course,
        courseType: baseExerciseTopic.courseType,
      });
    } else {
      this.form = this.formBuilder.group({
        title: '',
        course: '',
        courseType: CourseType.undefined,
      });
    }
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.form.get('courseType')?.value
    );
  }

  validate(): void {
    const newExerciseTopic: ExerciseTopicPostParameters = {
      title: this.form.get('title')?.value,
      course: this.form.get('course')?.value,
    };

    this.baseExerciseTopic
      ? this.updateExerciseTopic(newExerciseTopic)
      : this.addExerciseTopic(newExerciseTopic);
  }

  addExerciseTopic(newExerciseTopic: ExerciseTopicPostParameters): void {
    this.exerciseTopicService
      .addExerciseTopic(newExerciseTopic)
      .subscribe((success) => {
        if (success) {
          this.initForm();
          this.onValidate.emit();
        }
      });
  }

  updateExerciseTopic(newExerciseTopic: ExerciseTopicPostParameters): void {
    this.exerciseTopicService
      .updateExerciseTopic(this.baseExerciseTopic?.id ?? 0, newExerciseTopic)
      .subscribe((success) => {
        if (success) {
          this.initForm();
          this.onValidate.emit();
        }
      });
  }
}
