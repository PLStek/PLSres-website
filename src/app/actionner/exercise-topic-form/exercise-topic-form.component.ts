import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Course } from 'src/app/shared/models/course.model';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { ExerciseTopicPostParameters } from 'src/app/shared/models/exercise-topic-post-parameters';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-exercise-topic-form',
    templateUrl: './exercise-topic-form.component.html',
    styleUrls: ['./exercise-topic-form.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgFor,
        MainButtonComponent,
    ],
})
export class ExerciseTopicFormComponent implements OnInit {
  @Input() baseExerciseTopic?: ExerciseTopic;
  @Output() onValidate = new EventEmitter<void>();

  form!: UntypedFormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private formBuilder: UntypedFormBuilder,
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
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      course: ['', Validators.required],
      courseType: CourseType.undefined,
    });

    if (baseExerciseTopic) {
      this.form.setValue({
        title: baseExerciseTopic.topic,
        course: baseExerciseTopic.course,
        courseType: baseExerciseTopic.courseType,
      });
    }
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.form.get('courseType')?.value
    );
  }

  submit(): void {
    if (this.form.valid) {
      const newExerciseTopic: ExerciseTopicPostParameters = {
        title: this.form.get('title')?.value,
        course: this.form.get('course')?.value,
      };

      this.baseExerciseTopic
        ? this.updateExerciseTopic(newExerciseTopic)
        : this.addExerciseTopic(newExerciseTopic);
    } else {
      console.log('Formulaire invalide');
    }
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
