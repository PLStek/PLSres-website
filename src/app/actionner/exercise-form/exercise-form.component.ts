import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseTopic } from 'src/app/shared/models/exercise-topic.model';
import { ExerciseTopicService } from 'src/app/shared/services/exercise-topic.service';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExercisePostParameters } from 'src/app/shared/models/exercise-post-parameters.model';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
})
export class AddExerciceComponent implements OnInit {
  @Input() baseExercise?: Exercise;
  @Output() onValidate = new EventEmitter<void>();

  form!: UntypedFormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  exerciseTopicList: ExerciseTopic[] = [];

  //TODO: make static everywhere and check case
  courseTypeEnum = CourseType;

  constructor(
    private exerciseService: ExerciseService,
    private courseService: CourseService,
    private exerciseTopicService: ExerciseTopicService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm(this.baseExercise);

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
    });

    this.exerciseTopicService.getExerciseTopicList().subscribe((data) => {
      this.exerciseTopicList = data;
      if (this.baseExercise) {
        this.form
          .get('courseType')
          ?.setValue(
            data.find((topic) => topic.id === this.baseExercise?.topicId)
              ?.courseType
          );
        this.form
          .get('course')
          ?.setValue(
            data.find((topic) => topic.id === this.baseExercise?.topicId)
              ?.course
          );
      }
    });

    this.form.get('courseType')?.valueChanges.subscribe((data) => {
      this.updateCourseList();
      this.form.get('course')?.setValue('');
    });
  }

  initForm(baseExercise?: Exercise): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      difficulty: [0],
      course: ['', Validators.required],
      courseType: CourseType.undefined,
      topic: ['', Validators.required],
      isCorrected: [false],
      source: ['', Validators.required],
      content: [null],
    });
    if (baseExercise) {
      this.form.setValue({
        title: baseExercise.title,
        difficulty: baseExercise.difficulty,
        course: '',
        courseType: CourseType.undefined,
        topic: baseExercise.topicId,
        isCorrected: baseExercise.isCorrected,
        source: baseExercise.source,
        content: null,
      });
    }
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.form.get('courseType')?.value
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.get('content')?.setValue(file);
  }

  submit(): void {
    if (this.form.valid) {
      let newExercise: ExercisePostParameters = {
        title: this.form.get('title')?.value,
        difficulty: this.form.get('difficulty')?.value,
        topicId: this.form.get('topic')?.value,
        isCorrected: this.form.get('isCorrected')?.value,
        source: this.form.get('source')?.value,
        content: this.form.get('content')?.value,
      };

      this.baseExercise
        ? this.updateExercise(newExercise)
        : this.addExercise(newExercise);
    } else {
      console.log('Formulaire invalide');
    }
  }

  addExercise(newExercise: ExercisePostParameters): void {
    this.exerciseService.addExercise(newExercise).subscribe((success) => {
      if (success) {
        this.initForm();
        this.onValidate.emit();
      }
    });
  }

  updateExercise(newExercise: ExercisePostParameters): void {
    this.exerciseService
      .updateExercise(this.baseExercise?.id ?? 0, newExercise)
      .subscribe((success) => {
        if (success) {
          this.initForm();
          this.onValidate.emit();
        }
      });
  }
}
